app.factory('photoUploadService', ['$q', '$http', function($q, $http){
	return {
		uploadPhotos: function(photoFile, username){
			var i, uploadedFileName,
				fd = new FormData(),
				deferred = $q.defer();
			fd.append('username', username);
			console.log(photoFile.file);
			fd.append('photo', photoFile.file);
			$http({
					method  : 'POST',
					url     : '/photoupload',
					headers : { 
						'Content-Type': undefined ,
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma' : 'no-cache',
	                    'Expires' : '0'
	                     },
	                data    : fd,
					cache   : false
				}).	
				then( function(response){
					if(response.status === 200){
						console.log(response);
						uploadedFileName = response.data;						
						console.log(uploadedFileName + " Uploaded");
						deferred.resolve({'filename': uploadedFileName});					
					}
				},
				function(response){
					deferred.reject(response.status);
				});

			return deferred.promise;
		}
	}
}]);

app.factory('getPhotosService', ['$http', function($http){
	return {
		getPhotos: function(scope, username){
			$http({
				method  : 'GET',
				url     : 'photos',
				headers : { 
						'Content-Type': 'application/json' ,
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma' : 'no-cache',
	                    'Expires' : '0'
	                     },
				cache   : false,
				params  : {'username': username}
			}).
			then( function(response){
				var imageData = response.data
				if(imageData !== 'No Files Uploaded'){
					var i, photo, filePath = 'images/userimages/' + username.split(' ')[0] + '/',
					responseLength = imageData.length;
					for(i =0; i<responseLength; i++){
						photo = {'filename': imageData[i], 'src': filePath + imageData[i]};
						scope.profilePhotos.push(photo);
					}
				}
			})
		}
	}
}]);

app.factory('removePhotoService', ['$http', function($http){
	return {
		removePhoto: function(scope, username, filename){
			$http({
				method  : 'GET',
				url     : 'removephoto',
				headers : { 
						'Content-Type': 'application/json' ,
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma' : 'no-cache',
	                    'Expires' : '0'
	                     },
				cache   : false,
				params  : { 'username': username, 'filename': filename }
			}).
			then( function(response){
				if(response.status === 204){
					var i, photoListLength = scope.profilePhotos.length;
					for( i=0; i<photoListLength; i++){
						if(scope.profilePhotos[i].filename === filename){
							scope.profilePhotos.splice(i, 1);
							break;
						}
					}
					alert("Photo has been removed");
				}
			})
		}
	}
}]);