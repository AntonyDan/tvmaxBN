
app.factory('loginService', function($http, $location, $window, $rootScope, sessionService) {
  'use strict';

  function login(user) {
    $http.post('http://212.98.181.67/TV/api/Authorization/Login', user)
      .then(function(data) {
        var access_token = data.data.access_token;

        if(access_token) {
          sessionService.set('access_token', access_token);
          $window.location.href = $rootScope.appUrl + '#/profile';
        } else {
          alert('Ошибка доступа!');
        }
      });
  }

  function logout() {
    if(sessionService.get('access_token')) sessionService.destroy('access_token');
    $window.location.href = $rootScope.appUrl + 'login.html';
  }

  function isLogged() {
    if(sessionService.get('access_token')) return true;
  }

  return {
    login: login,
    logout: logout,
    isLogged: isLogged
  };
});
