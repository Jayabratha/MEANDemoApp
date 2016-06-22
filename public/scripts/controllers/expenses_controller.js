app.controller('expensesController', ['$scope', 'ExpenseService', '$window', '$stateParams',
	function($scope, ExpenseService, $window, $stateParams) {
		this.user;
		this.isStats = false;
		$scope.homeCntrl.activeTab = "expenses";

		if ($stateParams.username) {
			this.user = $stateParams.username;
			this.isStats = true;
		} else {
			this.user = $window.sessionStorage.getItem('user');
		}

		var Expense = function(amount, type, date, comment, user, group) {
			this.amount = amount;
			this.type = type;
			this.date = date;
			this.comment = comment;
			this.user = user;
			this.group = group;
		}

		this.expenseList = [];

		var self = this;
		//Fetch Expense Data
		ExpenseService.getExpenses(this.user).then(
			function(data) {
				if (data.success) {
					var expenseObj, expenses = data.expenses;
					expenses.forEach(function(expense, index) {
						expenseObj = new Expense(expense.amount, expense.type, expense.date, expense.comment, expense.user, expense.group);
						self.expenseList.push(expenseObj);
					})
				}
			},
			function(error) {
				alert("Couldn't load data");
			})
	}
])