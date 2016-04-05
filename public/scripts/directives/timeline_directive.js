app.directive('timelineTemplate', function($window, $timeout, throttle){
	return {
		restrict: 'E',
		scope: {
			infoalign : '='
		},
		templateUrl: 'timelinetemplate.html',
		link: function(scope, elems, attr){
			var elem = elems[0];
			var throttleCall = throttle();
			$timeout(function(){
				var elemtop = $(elem).find('.timelinebullet').offset().top;
				var viewTop = angular.element($(window)).scrollTop();
				var viewBottom = viewTop + angular.element($window).height();
				$(elem).find('.infocontainer').addClass('active');
				if((elemtop) < (viewBottom - 50)){
					$(elem).find('.infocontainer').addClass('show');
					$(elem).find('.metainfo').addClass('show');
				}
			}, 500);

			scope.showUpdates = function(){
				var viewTop = angular.element($(window)).scrollTop();
				var viewBottom = viewTop + angular.element($window).height();
				var elems = angular.element('.timelinebullet');
				for(var index = 0; index < elems.length; index ++ ){
					var elemoffsettop = angular.element('.timelinebullet:eq('+index+')').offset().top;
					var infoelem = angular.element('.timeline_template:eq('+index+') .infocontainer');
					var metainfoelem = angular.element('.timelineelemcontainer:eq('+index+') .metainfo');
					if(elemoffsettop < (viewBottom - 50)){
						infoelem.addClass('show');
						metainfoelem.addClass('show');
					}
					else if(infoelem.hasClass('show')){
						infoelem.removeClass('show');
						metainfoelem.removeClass('show');
					}
				}
			}

			angular.element($window).bind("scroll", function(){throttleCall(scope.showUpdates, 600);})
		}
	};
});