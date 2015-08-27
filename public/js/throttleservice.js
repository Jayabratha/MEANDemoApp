// Create an AngularJS service called debounce
app.factory('throttle', function() {
  // The service is actually this function, which we call with the func
  // that should be debounced and how long to wait in between calls
  return function throttle() {
    // Create a deferred object that will be resolved when we need to
    // actually call the func
    var wait = false;
    return function(func, waitlimit) {
      if(!wait){
        func.call();
        wait = true;
        setTimeout( function () {
            wait = false;
        }, waitlimit);
      }
    };
  };
});