var app = angular.module('app', []);

app.controller('mainController', function($scope){
	console.log("Testing");
	$scope.submitForm = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                alert('our form is amazing');
            }

        };

});