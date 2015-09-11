app.factory('photoUploadService', ['$http', function($http){
	return {
		uploadPhotos: function(photoArray){
			var fd = new FormData();
			fd.append('photo', photoArray);
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
}])