
app.factory('channelsService', function($http, loginService) {
  'use strict';

  return {
    getData: function(access_token) {
      return $http.get('http://212.98.181.67/TV/api/Packages/GetChannelsByUser', {
        headers: {
          "access_token": access_token
        }
      })
      .then(function success(response) {
        return response.data;
      }, function error(response) {
        if(response.status === 401) {
          alert('Время сессии закончилось. Нужно перелогиниться!');
          loginService.logout();
        }
      });
    }
  };
});
