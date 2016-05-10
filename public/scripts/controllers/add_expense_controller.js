app.controller('addExpenseController', ['$scope', '$window', 'ExpenseService',
	function($scope, $window, ExpenseService) {
		$scope.homeCntrl.activeTab = "addexpense";

		this.expenseTypes = ['Veg items', 'Non-Veg Items', 'Grocessary', 'Paper', 'Water', 'Sweeper', 'Others'];

		this.expenseData = {
			amount: '',
			type: '',
			date: new Date(),
			comments: '',
			user: '',
			group: ''
		};

		this.notifyErrors = false;

		this.addExpense = function(isValid, expenseData) {
			expenseData.user = $window.sessionStorage.getItem('user');
			expenseData.group = "test";
				if (isValid) {
					ExpenseService.addExpense(expenseData);
				} else {
					this.notifyErrors = true;
				}
		}
	}
])