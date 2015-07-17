var app = angular.module('app', ['ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("");
	$stateProvider.
		state('home', {
				url: '',
				templateUrl: 'homepage.html',
				controller: 'homepageController'
		}).
		state('login', {
				url: '/login',
				templateUrl: 'login.html',
				controller: 'loginController',
				resolve: {
					go : function(flipService){
						return flipService.flipLogin();
					}
				}
		}).
		state('register', {
				url: '/register',
				templateUrl: 'register.html',
				controller: 'registerController',
				resolve: {
					go : function(flipService){
						return flipService.flipLogin();
					}
				}
		}).
		state('profile', {
				url: '/profile',
				templateUrl: 'profile.html',
				controller: 'profileController',
				resolve: {
					userdata : function($q, getUserService, $rootScope){
						var defer = $q.defer();
						getUserService.getUserDetails().then(function(responsedata){
							defer.resolve(responsedata);
						}, function(responsedata){
							$rootScope.displayModal();
							$rootScope.setMessage(responsedata, 'Log In', 'login', false);
							$rootScope.loginstate.flipShow();
							defer.reject(responsedata);
						});

						return defer.promise;
					}
				}
		}).
		state('profile.photos', {
				url: '/photos',
				templateUrl: 'profilephotos.html',
				controller: 'photosController'
		}).
		state('profile.edit', {
				url: '/edit',
				templateUrl: 'editprofile.html',
				controller: 'profileEditController'
		})
}]);


app.run(['$rootScope', '$timeout', function($rootScope, $timeout){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Started");
		if(fromState.name === 'login'){
			$rootScope.loginstate.flipHide();
		}
		else if(fromState.name === 'register'){
			$rootScope.registerstate.flipHide();
		}
	});
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Success");
		if(toState.name === 'register'){
			$rootScope.registerstate.flipShow();
		}
		else if(toState.name === 'login'){
			$rootScope.loginstate.flipShow();
		}
	});
}]);

app.controller('appController', [ '$q', '$scope', '$rootScope', '$location', '$timeout', function($q, $scope, $rootScope, $location, $timeout) {

	console.log("In App Controller");

	/*Homepage State variables*/
	$rootScope.homestate = {
		headerClass : "",
		contentClass : "",
		showButton : "",
		showModal : ""
	};

	/*Login State variables*/
	$rootScope.loginstate = {
		state : 'fliphide',
		preload : 'preload',
		flipShow : function(){
			$timeout(function(){
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "";
			}, 10);
			$timeout(function(){
				$rootScope.loginstate.preload = "preload";
			}, 1000);
		},
		flipHide : function(){
			$timeout(function(){
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "fliphide";
			}, 10);
			$timeout(function(){
				$rootScope.loginstate.preload = "preload";
			}, 1000);
			
		}
	};

	/*Register State variables*/
	$rootScope.registerstate = {
		state : 'fliphide',
		preload : 'preload',
		flipShow : function(){
			$timeout(function(){
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "";
			}, 10);
			$timeout(function(){
				$rootScope.registerstate.preload = "preload";
			}, 1000);
		},
		flipHide : function(){
			$timeout(function(){
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "fliphide";
			}, 10);
			$timeout(function(){
				$rootScope.registerstate.preload = "preload";
			}, 1000);
			
		}
	};


	
	/*Profile State variables*/
	/*$scope.profilestate = {
		profilePageState : 'initial',
		profilePreloadClass : 'preload'
	};*/

	$rootScope.messageObj = {message: 'Task In Progress', action: '', link: '', inprogress: true };


	$rootScope.setMessage = function(message, action, link, inprogress){
		$rootScope.messageObj.message = message;
		$rootScope.messageObj.action = action;
		$rootScope.messageObj.link = link;
		$rootScope.messageObj.inprogress = inprogress;
	}

	$rootScope.displayModal = function(){
		$rootScope.showModal = "show";
	}

	$rootScope.hideModal = function(){
		$rootScope.messageObj.message = 'Task In Progress';
		$rootScope.messageObj.action = '';
		$rootScope.messageObj.link = '';
		$rootScope.messageObj.inprogress = true;
		$rootScope.showModal = "";
	}

	$scope.popAction = function(){
		if($rootScope.messageObj.action == 'Okay'){
			$rootScope.hideModal();
		}
		else if($rootScope.messageObj.link == 'profile'){
			$rootScope.hideModal();
			$location.path('profile');	
		}
		else if($rootScope.messageObj.link == 'login'){
			$rootScope.hideModal();
			$location.path('login');	
		}
	}
	

	$scope.resetVars = function(){
		console.log("Resetting Vars");
		$rootScope.homestate.headerClass = "";
		$rootScope.homestate.contentClass = "";
		$rootScope.homestate.showButton = "";
	}

	$scope.setVars = function(){
		$rootScope.homestate.headerClass = 'small';
		$rootScope.homestate.contentClass = 'showForm';
		$rootScope.homestate.showButton = 'hide';
		document.body.scrollTop = 0;
	}

}]);

