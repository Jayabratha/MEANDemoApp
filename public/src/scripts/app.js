/* Initialize The Angular App */
var app = angular.module('app', ['ui.router', 'ngAnimate']);

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("");
		$stateProvider.
		state('default', {
			url: '',
			template: '',
			controller: ['$scope', function($scope) {
				$scope.home.layout.resetVars();
			}]
		}).
		state('me', {
			url: '/me',
			templateUrl: 'templates/me.html',
			controller: 'meController as meCntrl'
		}).
		state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'loginController as loginCntrl',
			resolve: {
				go: ['flipService', function(flipService) {
					return flipService.flip();
				}]
			}
		}).
		state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: 'registerController as registerCntrl',
			resolve: {
				go: ['flipService', function(flipService) {
					return flipService.flip();
				}]
			}
		}).
		state('home', {
			url: '/home',
			templateUrl: 'templates/new_home.html',
			abstract: true,
			controller: 'homeController as homeCntrl',
			resolve: {
				userdata: ['$q', 'UserService', '$rootScope', function($q, UserService, $rootScope) {
					var defer = $q.defer();
					UserService.getUserDetails().then(
						function(responsedata) {
						defer.resolve(responsedata);
					}, function(responsedata) {
						$rootScope.displayModal();
						$rootScope.setMessage(responsedata, 'Log In', 'login', false);
						$rootScope.loginState.enter();
						defer.reject(responsedata);
					});
					return defer.promise;
				}]
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
			controller: 'statsController as statsCntrl'
		}).
		state('home.expenseDetail', {
			url: '/expense/:username',
			templateUrl: 'templates/expenses.html',
			controller: 'expensesController as expCntrl'
		}).
		state('home.notifications', {
			url: '/notifications',
			templateUrl: 'templates/notifications.html',
			controller: 'notificationsController'
		}).
		state('home.manage', {
			url: '/management',
			templateUrl: 'templates/management.html',
			controller: 'managementController as managementCntrl'
		}).
		state('home.profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'profileController as profileCntrl'
		}).
		state('home.expenses', {
			url: '/expenses',
			templateUrl: 'templates/expenses.html',
			controller: 'expensesController as expCntrl'
		}).
		state('home.group', {
			url: '/group',
			templateUrl: 'templates/group.html',
			controller: 'groupController as groupCntrl'
		});
	}
]);


app.run(['$rootScope', '$timeout', '$window', '$state',
	function($rootScope, $timeout, $window, $state) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState, fromParams) {
			var userName;
			if (fromState.name === 'login') {
				$rootScope.loginState.leave();
			} else if (fromState.name === 'register') {
				$rootScope.registerState.leave();
			}
			/* Go To Profile is user is already logged in */
			if (toState.name === 'register' || toState.name === 'login') {
				userName = $window.sessionStorage.getItem('user');
				if (userName) {
					event.preventDefault();
					$state.go('home.addExpense');
				}
			}
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams) {
			if (toState.name === 'register') {
				$rootScope.registerState.enter();
			} 
			if (toState.name === 'login') {
				$rootScope.loginState.enter();
			}

			//Background Animate Start Stop Logic
			if ((toState.name === 'login' || toState.name === 'register' || toState.name === 'default' || toState.name === 'me') &&
			 (fromState.name !== 'login' || fromState.name !== 'register' || fromState.name !== 'default')) {
				/* Render and Start Background Animation*/
				backgroundAnimation.renderBackground();
				backgroundAnimation.startAnimation();
			} else {
				backgroundAnimation.stopAnimation();
				backgroundAnimation.clearBackground();
			}
		});
	}
]);