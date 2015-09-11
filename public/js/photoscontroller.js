app.controller('photosController', [ '$scope', 'fileReaderService', 'photoUploadService',
									 function($scope, fileReaderService, photoUploadService){
	var i, sizeIndex = 0, preview, file, totalSize = 0, fSExt = new Array('bytes', 'KB', 'MB', 'GB');;

	function Photo(file, preview){
		this.file = file;
		this.preview = preview;
	}

	$scope.showPhotos();
	$scope.photoFiles;
	$scope.photosList = [];
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
			                    $scope.photosList.push(new Photo(file, preview));
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
		photoUploadService.uploadPhotos($scope.photoFiles[0]);
	}

}])