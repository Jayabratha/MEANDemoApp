app.controller('managementController',['$scope', 'ExpenseService', '$window', '$rootScope',
 function($scope, ExpenseService, $window, $rootScope){
	var vm = this, Rental;
	$scope.homeCntrl.activeTab = "manage";

	Rental = function (name, amount) {
		this.name = name;
		this.amount = amount;
	}

	vm.rentals = [];
	vm.group = $window.sessionStorage.getItem('group');

	vm.addRental = function () {
		var rental = new Rental("", "");
		vm.rentals.push(rental);
	};

	vm.saveRentals = function (group, rentals) {
		ExpenseService.saveGroupRentals(group, rentals).then(
			function(response) {
				$rootScope.displayModal();
				$rootScope.setMessage(response, 'Okay', '', false);
			},
			function(error) {
				$rootScope.displayModal();
				$rootScope.setMessage("Couldn't add your expense", 'Okay', '', false);
			});
	};

	//Fetch saved Rentals if any
	ExpenseService.getGroupRentals(vm.group).then(
		function(rentals) {
			var rentalObj;
			rentals.forEach(function(rental, index) {
				rentalObj = new Rental(rental.name, rental.amount);
				vm.rentals.push(rentalObj);
			});
		},
		function(error) {
			alert("Couldn't load data");
		});

}])