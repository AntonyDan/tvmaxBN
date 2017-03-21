
app.factory('scheduleService', function($http) {
  'use strict';

  return {
    getData: function(access_token, data) {
      return $http.get('http://212.98.181.67/TV/api/Packages/GetProgrammeByDay', {
        headers: {
          "access_token": access_token
        },
        params: data
      }).then(function succes(response) {
        return response.data;
      }, function error(response) {
        console.error(response);
      });
    }
  };
});
