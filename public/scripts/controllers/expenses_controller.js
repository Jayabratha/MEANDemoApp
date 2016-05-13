app.controller('expensesController', ['$scope', 'ExpenseService', '$window',
	function($scope, ExpenseService, $window) {
		$scope.homeCntrl.activeTab = "expenses";

		var user = $window.sessionStorage.getItem('user');

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
		ExpenseService.getExpenses(user).then(
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