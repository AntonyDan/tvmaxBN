
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

  function logout(all = true) {
    if(sessionService.get('access_token')) {
      if(all) {
	      $http.get('http://212.98.181.67/TV/api/Authorization/Logout', {
	        headers: {"access_token": sessionService.get('access_token')}
	      }).then(function success(response) {
	    	  sessionService.destroy('access_token');
	          $window.location.href = $rootScope.appUrl + 'login.html';
	      }, function error(response) {
	          console.error(response);
	      });
      }
      else {
    	  sessionService.destroy('access_token');
    	  $window.location.href = $rootScope.appUrl + 'login.html';
      }
    }
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
