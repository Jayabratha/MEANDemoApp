app.controller('addExpenseController',['$scope', '$window', function($scope, $window){
	$scope.homeCntrl.activeTab = "addexpense";

	this.expenseTypes = ['Veg items','Non-Veg Items','Grocessary','Paper','Water','Sweeper','Others'];

	this.expenseData = {
		amount: '',
		type: '',
		date: new Date(),
		comments: '',
		user: '',
		group: ''
	}
}])