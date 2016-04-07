var app = angular.module('app', ['ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
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
					go : function(flipService){
						return flipService.flip();
					}
				}
		}).
		state('register', {
				url: '/register',
				templateUrl: 'templates/register.html',
				controller: 'registerController as registerCntrl',
				resolve: {
					go : function(flipService){
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
					userdata : function($q, getUserService, $rootScope){
						var defer = $q.defer();
						getUserService.getUserDetails().then(function(responsedata){
							defer.resolve(responsedata);
						}, function(responsedata){
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
				templateUrl: 'templates/timeline.html',
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
}]);


app.run(['$rootScope', '$timeout', function($rootScope, $timeout){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Started");
		if(fromState.name === 'login'){
			$rootScope.loginState.leave();
		}
		else if(fromState.name === 'register'){
			$rootScope.registerState.leave();
		}
	});
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Success");
		if(toState.name === 'register'){
			$rootScope.registerState.enter();
		}
		else if(toState.name === 'login'){
			$rootScope.loginState.enter();
		}
	});
}]);