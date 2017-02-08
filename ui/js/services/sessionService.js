
app.factory('sessionService', function($http, $cookies) {
  'use strict';

  var now = new Date(),
      exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  function set(key, value) {
    return $cookies.put(key, value, {
      expires: exp
    });
  }

  function get(key) {
    return $cookies.get(key);
  }

  function destroy(key) {
    return $cookies.remove(key);
  }

  return {
    set: set,
    get: get,
    destroy : destroy
  };
});
