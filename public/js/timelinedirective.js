app.directive('timelineTemplate', function($window, $timeout){
	return {
		restrict: 'E',
		scope: {
			infoalign : '='
		},
		templateUrl: 'timelinetemplate.html',
		link: function(scope, elems, attr){
			var elem = elems[0];
			$timeout(function(){
				var elemtop = $(elem).find('.timelinebullet').offset().top;
				var viewTop = angular.element($(window)).scrollTop();
				var viewBottom = viewTop + angular.element($window).height();
				$(elem).find('.infocontainer').addClass('active');
				if((elemtop) < (viewBottom - 100)){
					$(elem).find('.infocontainer').addClass('show');
				}
			}, 600);

			angular.element($window).bind("scroll", function(){
				var viewTop = angular.element($(window)).scrollTop();
				var viewBottom = viewTop + angular.element($window).height();
				var elems = angular.element('.timelinebullet');
				for(var index = 0; index < elems.length; index ++ ){
					var elemoffsettop = angular.element('.timelinebullet:eq('+index+')').offset().top;
					console.log("Outer Top: " + elemoffsettop);
					var infoelem = angular.element('.timeline_template:eq('+index+') .infocontainer');
					if(elemoffsettop < (viewBottom - 100)){
						infoelem.addClass('show');
					}
					else if(infoelem.hasClass('show')){
						infoelem.removeClass('show');
					}
				}
			})

		}
	};
});