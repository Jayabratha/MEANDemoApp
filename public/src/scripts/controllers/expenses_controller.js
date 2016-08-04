app.controller('expensesController', ['$scope', 'ExpenseService', '$window', '$stateParams',
	function($scope, ExpenseService, $window, $stateParams) {
		var date = new Date(),
			vm = this, getExpenseDetails;

		vm.user,
		vm.currentMonth = date.getMonth(),
		vm.currentYear = date.getFullYear();
		vm.isStats = false;
		vm.totalExpense = 0;
		vm.expenseList = [];
		vm.expenseLoaded = false;

		if ($stateParams.username) {
			vm.user = $stateParams.username;
			vm.isStats = true;
		} else {
			vm.user = $window.sessionStorage.getItem('user');
			$scope.homeCntrl.activeTab = "expenses";
		}

		var Expense = function(amount, type, date, comment, user, group) {
			this.amount = amount;
			this.type = type;
			this.date = date;
			this.comment = comment;
			this.user = user;
			this.group = group;
		}

		

		//Fetch Expense Data
		getExpenseDetails = function (user, month, year) {
			vm.expenseLoaded = false;
			ExpenseService.getExpenses(user, month, year).then(
			function(data) {
				if (data.success) {
					var expenseObj, expenses = data.expenses;
					vm.expenseList = [];
					vm.totalExpense = 0;
					vm.expenseLoaded = true;
					expenses.forEach(function(expense, index) {
						expenseObj = new Expense(expense.amount, expense.type, expense.date, expense.comment, expense.user, expense.group);
						vm.expenseList.push(expenseObj);
						vm.totalExpense = vm.totalExpense + expense.amount;
					})
				}
			},
			function(error) {
				alert("Couldn't load data");
			});
		}

		$scope.$watchGroup(['expCntrl.currentMonth', 'expCntrl.currentYear'], function () {
			getExpenseDetails(vm.user, vm.currentMonth, vm.currentYear)
		});
		
	}
]);