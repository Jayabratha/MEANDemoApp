app.directive('messageDiv', function(){
	return {
		restrict: 'A',
		scope: {
			messageobj: '=messageobj',
			close: '&onClose',
			action: '&popAction'
		},
		templateUrl: 'message-modal.html',
	};
});