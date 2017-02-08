app.filter('time', function() {
  'use strict';

  return function(date) {
    return date.slice(8, 10) + ':' + date.slice(10, 12);
  };
});
