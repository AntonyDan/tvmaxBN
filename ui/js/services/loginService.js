
app.factory('loginService', function($http, $location, $window, $rootScope, sessionService) {
  'use strict';

  function login(user) {
    /*var data = 'name=' + encodeURIComponent(user.name) +'&password=' + encodeURIComponent(user.password);
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
    xhr = new XHR();
    xhr.open('POST', 'http://212.98.181.67/TV/api/Authorization/Login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      alert(this.responseText);
    };
    xhr.onerror = function() {
      alert( 'Ошибка ' + this.status );
    };
    xhr.send(JSON.stringify(data)); */
    var serializeData = Object.keys(user).map(function(k) {
         return encodeURIComponent(k) + '=' + encodeURIComponent(user[k])
    }).join('&');
    $http({
      method:'POST',
      url: 'http://212.98.181.67/TV/api/Authorization/Login',
      data: serializeData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      }).then(function(data) {
        var access_token = data.data.access_token;
        if(access_token) {
          sessionService.set('access_token', access_token);
          $window.location.href = $rootScope.appUrl + '#/profile';
        } else {
          alert('Ошибка доступа!');
        }
      });
  }


  function logout(all) {
    if(sessionService.get('access_token')) {
      if(all != false) {
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
