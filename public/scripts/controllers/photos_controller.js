app.controller('photosController', [ '$scope', 'fileReaderService', 'photoUploadService', 'getPhotosService',
									 'removePhotoService', '$cookies', function($scope, fileReaderService, photoUploadService,
									  getPhotosService, removePhotoService, $cookies){
	var i, profilePhotos,  preview, file, 
		sizeIndex = 0,
		totalSize = 0, 
		fSExt = new Array('bytes', 'KB', 'MB', 'GB');;

	function Photo(file, preview, newFileName){
		this.file = file;
		this.preview = preview;
		this.newFileName = newFileName;
	}

	$scope.showPhotos();
	$scope.photoFiles;
	$scope.newPhotosList = [];
	$scope.profilePhotos = [];
	$scope.fileCount = 0;
	$scope.totalFileSize = 0;

	$scope.createPreview = function(){
		var files = $scope.photoFiles,
			filesLength = $scope.photoFiles.length;
		for(i = 0; i< filesLength; i++){
				file = files[i];
				fileReaderService.readAsDataUrl(file, $scope)
							 .then(function(result) {
							 	file = result.file
			                    preview = result.src;
			                    $scope.newPhotosList.push(new Photo(file, preview));
			                 });
			    totalSize += file.size;
		}
    	while(totalSize>900){
    		totalSize/=1024;
    		sizeIndex++;
    	}

    	$scope.fileCount += i;
    	$scope.totalFileSize = (Math.round(totalSize*100)/100) + ' ' + fSExt[sizeIndex];
	};

	$scope.uploadPhotos = function(){
		var i, photoToUpload, uploadedFileName, username = $cookies.get('user'),
			filePath = 'images/userimages/' + username.split(' ')[0] + '/', 
			photoArrayLength = $scope.newPhotosList.length;
		for(i = 0; i<photoArrayLength; i++){
			photoToUpload = $scope.newPhotosList[i];
			photoUploadService.uploadPhotos(photoToUpload, username).then(function(uploadedFile){
				uploadedFileName = uploadedFile.filename;
				console.log(uploadedFileName);
				$scope.profilePhotos.splice(0, 0, {'filename': uploadedFileName, 'src': filePath + uploadedFileName});
				$scope.newPhotosList.splice(0, 1);
			});
		}		
	}

	$scope.removePhoto = function(filename){
		removePhotoService.removePhoto($scope, $cookies.get('user'), filename);
	}

	//Get Profile Photos
	getPhotosService.getPhotos($scope, $cookies.get('user'));

}])