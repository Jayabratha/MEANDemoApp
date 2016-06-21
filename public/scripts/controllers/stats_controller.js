app.controller('statsController',['$scope', '$window', 'UserService', 'ExpenseService',
	function($scope, $window, UserService, ExpenseService) {
		var Member, getMemberByUsername, vm = this;
		vm.group = $window.sessionStorage.getItem('group');
		$scope.homeCntrl.activeTab = "stats";

		vm.groupMembers = [];

		Member = function(username, firstname, lastname, dpLink, expense) {
			this.username = username
			this.firstname = firstname;
			this.lastname = lastname;
			this.dpLink = dpLink;
			this.expense = expense;
		}

		Member.prototype.updateExpense = function (expense) {
			this.expense = expense;
		}

		getMemberByUsername = function (username) {
			var i, memberLength = vm.groupMembers.length;
			for (i = 0; i < memberLength; i++) {
				if (vm.groupMembers[i].username === username) {
					return vm.groupMembers[i];
				}
			}
		}

		//Get Group Members
		UserService.getGroupMembers(this.group).then(
			function(members) {
				var memberObj;
				members.forEach(function(member, index) {
					memberObj = new Member(member.username, member.firstname, member.lastname, member.dpLink, 0);
					vm.groupMembers.push(memberObj);
				});
			},
			function(error) {
				alert("Couldn't load data");
			});

		//Fetch Expense Data and update
		ExpenseService.getGroupExpenses(this.group).then(
			function(expenses) {
				var user;
				expenses.forEach(function(expenseObj, index) {
					user = getMemberByUsername(expenseObj._id);
					user.updateExpense(expenseObj.expense);
				});
			},
			function(error) {
				alert("Couldn't load data");
			})

}])