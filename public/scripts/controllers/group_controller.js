app.controller('groupController', ['$scope', '$window', 'UserService',
	function($scope, $window, UserService) {
		this.group = $window.sessionStorage.getItem('group');
		$scope.homeCntrl.activeTab = "group";

		this.groupMembers = [];

		Member = function(firstname, lastname, isAdmin, dpLink) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.isAdmin = isAdmin;
			this.dpLink = dpLink;
		}

		//Get Group Members
		var self = this;
		//Fetch Expense Data
		UserService.getGroupMembers(this.group).then(
			function(members) {
				var memberObj;
				members.forEach(function(member, index) {
					memberObj = new Member(member.firstname, member.lastname, member.admin, member.dpLink);
					self.groupMembers.push(memberObj);
				});
			},
			function(error) {
				alert("Couldn't load data");
			});

	}
])