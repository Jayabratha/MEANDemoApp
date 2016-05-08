/* Initialize The Angular App */
var app = angular.module('app', ['ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("");
		$stateProvider.
		state('default', {
			url: '',
			template: '',
			controller: function($scope) {
				$scope.home.layout.resetVars();
			}
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
		state('home', {
			url: '/home',
			templateUrl: 'templates/new_home.html',
			abstract: true,
			controller: 'homeController as homeCntrl',
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
		state('home.addExpense', {
			url: '',
			templateUrl: 'templates/add_expense.html',
			controller: 'addExpenseController as addExpCntrl'
		}).
		state('home.stats', {
			url: '/stats',
			templateUrl: 'templates/stats.html',
			controller: 'statsController'
		}).
		state('home.notifications', {
			url: '/notifications',
			templateUrl: 'templates/notifications.html',
			controller: 'notificationsController'
		}).
		state('home.profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'profileController'
		}).
		state('home.expenses', {
			url: '/expenses',
			templateUrl: 'templates/expenses.html',
			controller: 'expensesController'
		}).
		state('home.group', {
			url: '/group',
			templateUrl: 'templates/group.html',
			controller: 'groupController'
		})
	}
]);


app.run(['$rootScope', '$timeout', '$cookies', '$state',
	function($rootScope, $timeout, $cookies, $state) {
		var backgroundAnimation = bgAnimate.getInstance();

		/* Render and Start Background Animation*/
		backgroundAnimation.renderBackground();
		backgroundAnimation.startAnimation();

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
				if (fromState.name === 'profile.timeline' || fromState.name === 'profile.photos' || fromState.name === 'profile.edit') {
					/* Render and Start Background Animation*/
					backgroundAnimation.renderBackground();
					backgroundAnimation.startAnimation();
				}
				$rootScope.loginState.enter();
			} else if (toState.name === 'profile.timeline') {
				backgroundAnimation.stopAnimation();
				backgroundAnimation.clearBackground();
			}
		});
	}
]);