app.directive('messageDiv', function(){
	return {
		restrict: 'A',
		scope: {
			messageObj: '=messageObj',
			close: '&onClose',
			action: '&popAction'
		},
		templateUrl: 'templates/message_modal.html',
	};
});