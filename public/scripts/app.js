/* Create a Web Worker to create the bakground */
$(document).ready(function() {
	var i, j, background, screenWidth, screenHeight, numberOfRows, numberofCols;

	/* Get Background Reference */
	background = $('#node-background');
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	console.log(background, screenWidth, screenHeight);

	numberOfRows = Math.ceil(screenHeight / 40) + 20;
	numberofCols = Math.floor(screenWidth / 40) + 20;

	console.log(numberOfRows, numberofCols);

	/* Create Rows */
	for (i = 0; i < numberOfRows; i++) {
		background.append($('#row-template').html());
	}

	/* Create Icons per Row */
	for (j = 0; j < numberofCols; j++) {
		$('#node-background .row').append($('#icon-template').html());
	}

});

/* Initialize The Angular App */
var app = angular.module('app', ['ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("");
		$stateProvider.
		state('home', {
			url: '',
			templateUrl: 'templates/homepage.html',
			controller: 'homepageController'
		}).
		state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'loginController as loginCntrl',
			resolve: {
				go: function(flipService) {
					return flipService.flip();
				}
			}
		}).
		state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: 'registerController as registerCntrl',
			resolve: {
				go: function(flipService) {
					return flipService.flip();
				}
			}
		}).
		state('profile', {
			url: '/profile',
			templateUrl: 'templates/new_profile.html',
			abstract: true,
			controller: 'profileController',
			resolve: {
				userdata: function($q, getUserService, $rootScope) {
					var defer = $q.defer();
					getUserService.getUserDetails().then(function(responsedata) {
						defer.resolve(responsedata);
					}, function(responsedata) {
						$rootScope.displayModal();
						$rootScope.setMessage(responsedata, 'Log In', 'login', false);
						$rootScope.loginState.enter();
						defer.reject(responsedata);
					});
					return defer.promise;
				}
			}
		}).
		state('profile.timeline', {
			url: '',
			templateUrl: 'templates/my_feed.html',
			controller: 'timelineController'
		}).
		state('profile.photos', {
			url: '/photos',
			templateUrl: 'templates/profilephotos.html',
			controller: 'photosController'
		}).
		state('profile.edit', {
			url: '/edit',
			templateUrl: 'templates/editprofile.html',
			controller: 'profileEditController'
		})
	}
]);


app.run(['$rootScope', '$timeout', '$cookies', '$state',
	function($rootScope, $timeout, $cookies, $state) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState, fromParams) {
			var userName;
			if (fromState.name === 'login') {
				$rootScope.loginState.leave();
			} else if (fromState.name === 'register') {
				$rootScope.registerState.leave();
			}
			/* Go To Profile is user is already logged in */
			if (toState.name === 'register' || toState.name === 'login') {
				userName = $cookies.get('user');
				if (userName) {
					event.preventDefault();
					$state.go('profile.timeline');
				}
			}
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams) {
			if (toState.name === 'register') {
				$rootScope.registerState.enter();
			} else if (toState.name === 'login') {
				$rootScope.loginState.enter();
			}
		});
	}
]);