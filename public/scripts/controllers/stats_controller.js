app.controller('statsController',['$scope', '$window', '$interval', 'UserService', 'ExpenseService', '$state',
	function($scope, $window, $interval, UserService, ExpenseService, $state) {
		var Member, getMemberByUsername, vm = this, getTopContributor, updateContributions, getRentals,
		 calculatePerHead;
		vm.group = $window.sessionStorage.getItem('group');
		$scope.homeCntrl.activeTab = "stats";

		vm.groupMembers = [];
		vm.rentals = [];
		vm.topExpense = 100;
		vm.totalContributions = 0;
		vm.totalMonthlyExpense = 0;
		vm.monthyExpensePerHead = 0;

		Member = function(username, firstname, lastname, dpLink, expense) {
			this.username = username
			this.firstname = firstname;
			this.lastname = lastname;
			this.dpLink = dpLink;
			this.expense = expense;
		}

		Rental = function (name, amount) {
			this.name = name;
			this.amount = amount;
		}

		Member.prototype.updateExpense = function (expense) {
			var self = this, updater;
			 performUpdate = function () {
			 	if (expense > self.expense) {
			 		self.expense++;
			 	} else {
			 		 $interval.cancel(updater);
			 	}
			 };
			updater = $interval(performUpdate, 0.2);		
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

		//Calculate Per Head
		calculatePerHead = function() {
			var i, rentalsLength = vm.rentals.length, totalRentals = 0,
			 	numberOfMembers = vm.groupMembers.length;
			
			for (i = 0; i < rentalsLength; i++) {
				totalRentals = totalRentals + vm.rentals[i].amount;
			}
			vm.totalMonthlyExpense = (vm.totalContributions + totalRentals);
			vm.monthyExpensePerHead =  vm.totalMonthlyExpense / numberOfMembers;
		}

		//Get Rentals
		getRentals = function (group) {
			ExpenseService.getGroupRentals(group).then(
				function(rentals) {
					var rentalObj;
					rentals.forEach(function(rental, index) {
						rentalObj = new Rental(rental.name, rental.amount);
						vm.rentals.push(rentalObj);
					});
					calculatePerHead();
				},
				function(error) {
					alert("Couldn't load data");
				});
		}

		//Fetch Expense Data and update
		updateContributions = function (group) {
			ExpenseService.getGroupExpenses(group).then(
			function(expenses) {
				var user, expenseBarWidth, topContributor = getTopContributor(expenses);
				 vm.topExpense = topContributor.expense;
				expenses.forEach(function(expenseObj, index) {
					user = getMemberByUsername(expenseObj._id);
					user.updateExpense(expenseObj.expense);
					vm.totalContributions = vm.totalContributions + expenseObj.expense;
				});
				getRentals(vm.group);
			},
			function(error) {
				alert("Couldn't load data");
			})
		}

		//Show Contribution Details
		vm.showContributionDetails = function (username) {
			$state.go('home.expenseDetail', {username: username});
		}

		

		//Get Group Members
		UserService.getGroupMembers(vm.group).then(
			function(members) {
				var memberObj;
				members.forEach(function(member, index) {
					memberObj = new Member(member.username, member.firstname, member.lastname, member.dpLink, 0);
					vm.groupMembers.push(memberObj);
				});
				updateContributions(vm.group);
			},
			function(error) {
				alert("Couldn't load data");
			});
		
}])