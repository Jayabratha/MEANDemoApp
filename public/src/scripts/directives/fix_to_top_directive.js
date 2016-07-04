app.directive('fixToTop', [ '$window', function($window) {
  var $win = angular.element($window); // wrap window object as jQuery object

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var topClass = attrs.fixToTop; // get CSS class from directive's attribute value

      $win.on('scroll', function(e) {
        if ($win.scrollTop() >= 248) {
          element.addClass(topClass);
        } else {
          element.removeClass(topClass);
        }
      });
    }
  };
}]);