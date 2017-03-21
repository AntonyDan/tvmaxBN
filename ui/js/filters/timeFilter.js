app.filter('time', function() {
  'use strict';

  return function(date) {
    return date.slice(11, 16);
  };
});
