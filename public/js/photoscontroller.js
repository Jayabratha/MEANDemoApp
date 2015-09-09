app.controller('photosController', [ '$scope', 'fileReaderService', function($scope, fileReaderService){
	var i,
		preview,
		file;

	function Photo(file, preview){
		this.file = file;
		this.preview = preview;
	}

	$scope.showPhotos();
	$scope.photoFiles;
	$scope.photosList = [];

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
		}
	}

}])