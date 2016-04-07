app.controller('appController', ['$q', '$scope', '$rootScope', '$location', '$timeout',
	function($q, $scope, $rootScope, $location, $timeout) {
		var Animate;

		Animate = function(animateClass, preloadClass) {
			var page = this;
			page.state = animateClass;
			page.preload = preloadClass;
			this.enter = function() {
				$timeout(function() {
					page.preload = "";
					page.state = "";
				}, 10);
				$timeout(function() {
					page.preload = "preload";
				}, 1000);
			};
			this.leave = function() {
				$timeout(function() {
					page.preload = "";
					page.state = "fliphide";
				}, 10);
				$timeout(function() {
					page.preload = "preload";
				}, 2000);
			}
		};

		//Login State Animation
		$rootScope.loginState = new Animate('fliphide', 'preload');

		//Login Register Animation
		$rootScope.registerState = new Animate('fliphide', 'preload');

		/*Homepage Layout variable*/
		this.layout = {
			headerClass: "",
			contentClass: "",
			showButton: "",
			showModal: "",
			resetVars : function() {
				this.headerClass = "";
				this.contentClass = "";
				this.showButton = "";
			},
			setVars : function(style) {
				this.headerClass = style;
				this.contentClass = 'show-form';
				this.showButton = 'hide';
				document.body.scrollTop = 0;
			}
		};


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
		};

		$rootScope.displayModal = function() {
			$rootScope.showModal = "show";
		};

		$rootScope.hideModal = function() {
			$rootScope.messageObj.message = 'Task In Progress';
			$rootScope.messageObj.action = '';
			$rootScope.messageObj.link = '';
			$rootScope.messageObj.inprogress = true;
			$rootScope.showModal = "";
		};

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
		};

	}
]);