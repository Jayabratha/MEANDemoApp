app.factory('photoUploadService', ['$http', function($http){
	return {
		uploadPhotos: function(photoArray, username){
			var i, photoArrayLength = photoArray.length, fd = new FormData();
			fd.append('username', username);
			for(i=0; i<photoArrayLength; i++){
				fd.append('photo', photoArray[i]);
			}
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
				success( function(response){
					alert("Photo Uploaded");
				});
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
			success( function(response){
				var i, photo, filePath = 'images/userimages/' + username + '/',
					responseLength = response.length;
				for(i =0; i<responseLength; i++){
					photo = {'filename': response[i], 'src': filePath + response[i]};
					scope.profilePhotos.push(photo);
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
			success( function(response){
				var i, photoListLength = scope.profilePhotos.length;
				for( i=0; i<photoListLength; i++){
					if(scope.profilePhotos[i].filename === filename){
						scope.profilePhotos.splice(i, 1);
						break;
					}
				}
			})
		}
	}
}]);