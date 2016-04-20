app.directive('messageDiv', function(){
	return {
		restrict: 'A',
		scope: {
			messageobj: '=messageobj',
			close: '&onClose',
			action: '&popAction'
		},
		templateUrl: 'templates/message_modal.html',
	};
});