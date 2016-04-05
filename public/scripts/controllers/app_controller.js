app.controller('appController', ['$q', '$scope', '$rootScope', '$location', '$timeout', function($q, $scope, $rootScope, $location, $timeout) {

	console.log("In App Controller");

	/*Homepage State variables*/
	$rootScope.homestate = {
		headerClass: "",
		contentClass: "",
		showButton: "",
		showModal: ""
	};

	/*Login State variables*/
	$rootScope.loginstate = {
		state: 'fliphide',
		preload: 'preload',
		flipShow: function() {
			$timeout(function() {
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "";
			}, 10);
			$timeout(function() {
				$rootScope.loginstate.preload = "preload";
			}, 1000);
		},
		flipHide: function() {
			$timeout(function() {
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "fliphide";
			}, 10);
			$timeout(function() {
				$rootScope.loginstate.preload = "preload";
			}, 1000);

		}
	};

	/*Register State variables*/
	$rootScope.registerstate = {
		state: 'fliphide',
		preload: 'preload',
		flipShow: function() {
			$timeout(function() {
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "";
			}, 10);
			$timeout(function() {
				$rootScope.registerstate.preload = "preload";
			}, 1000);
		},
		flipHide: function() {
			$timeout(function() {
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "fliphide";
			}, 10);
			$timeout(function() {
				$rootScope.registerstate.preload = "preload";
			}, 1000);

		}
	};



	/*Profile State variables*/
	/*$scope.profilestate = {
		profilePageState : 'initial',
		profilePreloadClass : 'preload'
	};*/

	$rootScope.messageObj = {
		message: 'Task In Progress',
		action: '',
		link: '',
		inprogress: true
	};


	$rootScope.setMessage = function(message, action, link, inprogress) {
		$rootScope.messageObj.message = message;
		$rootScope.messageObj.action = action;
		$rootScope.messageObj.link = link;
		$rootScope.messageObj.inprogress = inprogress;
	}

	$rootScope.displayModal = function() {
		$rootScope.showModal = "show";
	}

	$rootScope.hideModal = function() {
		$rootScope.messageObj.message = 'Task In Progress';
		$rootScope.messageObj.action = '';
		$rootScope.messageObj.link = '';
		$rootScope.messageObj.inprogress = true;
		$rootScope.showModal = "";
	}

	$scope.popAction = function() {
		if ($rootScope.messageObj.action == 'Okay') {
			$rootScope.hideModal();
		} else if ($rootScope.messageObj.link == 'profile') {
			$rootScope.hideModal();
			$location.path('profile');
		} else if ($rootScope.messageObj.link == 'login') {
			$rootScope.hideModal();
			$location.path('login');
		}
	}


	$scope.resetVars = function() {
		console.log("Resetting Vars");
		$rootScope.homestate.headerClass = "";
		$rootScope.homestate.contentClass = "";
		$rootScope.homestate.showButton = "";
	}

	$scope.setVars = function() {
		$rootScope.homestate.headerClass = 'small';
		$rootScope.homestate.contentClass = 'show-form';
		$rootScope.homestate.showButton = 'hide';
		document.body.scrollTop = 0;
	}

}]);