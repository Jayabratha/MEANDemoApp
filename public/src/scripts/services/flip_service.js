app.factory('flipService', ['$q', '$timeout', function($q, $timeout){
	return {
		flip : function(){
			var deferred = $q.defer();

			$timeout(function(){
				deferred.resolve("complete");
			}, 500);

			return deferred.promise;
		}
	}
}])