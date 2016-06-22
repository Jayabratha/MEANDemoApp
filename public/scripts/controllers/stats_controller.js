app.controller('statsController',['$scope', '$window', 'UserService', 'ExpenseService',
	function($scope, $window, UserService, ExpenseService) {
		var Member, getMemberByUsername, vm = this, getTopContributor, updateContributions;
		vm.group = $window.sessionStorage.getItem('group');
		$scope.homeCntrl.activeTab = "stats";

		vm.groupMembers = [];

		Member = function(username, firstname, lastname, dpLink, expense, expenseBarWidth) {
			this.username = username
			this.firstname = firstname;
			this.lastname = lastname;
			this.dpLink = dpLink;
			this.expense = expense;
			this.expenseBarWidth = expenseBarWidth;
		}

		Member.prototype.updateExpense = function (expense, expenseBarWidth) {
			this.expense = expense;
			this.expenseBarWidth = expenseBarWidth;
		}

		//Get Member by Username
		getMemberByUsername = function (username) {
			var i, memberLength = vm.groupMembers.length;
			for (i = 0; i < memberLength; i++) {
				if (vm.groupMembers[i].username === username) {
					return vm.groupMembers[i];
				}
			}
		}

		//Get Top Contributor
		getTopContributor = function (contributions) {
			var compare = function(a, b) {
				if (a.expense > b.expense) {
				   return 1;
				}
				if (a.expense < b.expense) {
				   return -1;
				}
				// a must be equal to b
				return 0;
			}

			contributions.sort(compare);

			return contributions[contributions.length - 1];

		}

		//Fetch Expense Data and update
		updateContributions = function (group) {
			ExpenseService.getGroupExpenses(group).then(
			function(expenses) {
				var user, expenseBarWidth, topContributor = getTopContributor(expenses),
				 topExpense = topContributor.expense;
				expenses.forEach(function(expenseObj, index) {
					user = getMemberByUsername(expenseObj._id);
					expenseBarWidth = (expenseObj.expense / topExpense) * 100;
					user.updateExpense(expenseObj.expense, expenseBarWidth);
				});
			},
			function(error) {
				alert("Couldn't load data");
			})
		}

		//Get Group Members
		UserService.getGroupMembers(vm.group).then(
			function(members) {
				var memberObj;
				members.forEach(function(member, index) {
					memberObj = new Member(member.username, member.firstname, member.lastname, member.dpLink, 0, 0);
					vm.groupMembers.push(memberObj);
				});
				updateContributions(vm.group);
			},
			function(error) {
				alert("Couldn't load data");
			});

}])