app.controller('addExpenseController', ['$scope', '$rootScope', '$window', 'ExpenseService',
	function($scope, $rootScope, $window, ExpenseService) {
		$scope.homeCntrl.activeTab = "addexpense";

		this.expenseTypes = ['Veg items', 'Non-Veg Items', 'Grocery', 'Paper', 'Water', 'Sweeper', 'Others'];

		this.expenseData = {
			amount: '',
			type: '',
			date: new Date(),
			comment: '',
			user: '',
			group: ''
		};

		this.notifyErrors = false;

		this.addExpense = function(isValid, expenseData) {
			expenseData.user = $window.sessionStorage.getItem('user');
			expenseData.group = "Jyoti Tower";
			if (isValid) {
				ExpenseService.addExpense(expenseData).then(
					function(response) {
						$rootScope.displayModal();
						$rootScope.setMessage(response.message, 'Okay', '', false);
					},
					function(error) {
						$rootScope.displayModal();
						$rootScope.setMessage("Couldn't add your expense", 'Try Again', '', false);
					}
				);
			} else {
				this.notifyErrors = true;
			}
		}
	}
])