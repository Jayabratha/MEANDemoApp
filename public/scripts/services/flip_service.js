app.factory('flipService', ['$q', '$timeout', function($q, $timeout){
	return {
		flipLogin : function(){
			var deferred = $q.defer();

			$timeout(function(){
				console.log("Route change occurs");
				deferred.resolve("complete");
			}, 500);

			return deferred.promise;
		}
	}
}])