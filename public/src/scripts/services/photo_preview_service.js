app.factory('fileReaderService', ['$q', function($q){
		var onLoad = function(reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve({'file': file, 'src': reader.result});
                });
            };
        };
 
        var onError = function (reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    deferred.reject({'file': file, 'src': reader.result});
                });
            };
        };
 
        var onProgress = function(reader, scope, file) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope, file) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope, file);
            reader.onerror = onError(reader, deferred, scope, file);
            reader.onprogress = onProgress(reader, scope, file);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope, file);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
}]);