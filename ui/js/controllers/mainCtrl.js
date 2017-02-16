var mainCtrl = app.controller('mainCtrl', function($scope, loginService, sessionService, userService) {
  'use strict';

  if(!loginService.isLogged()) {
    loginService.logout();
  }

  $scope.access_token = sessionService.get('access_token');
});
