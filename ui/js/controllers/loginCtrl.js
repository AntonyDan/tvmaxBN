var loginCtrl = app.controller('loginCtrl', function($scope, loginService) {
  'use strict';

  $scope.login = function(user) {
    loginService.login(user);
  };
});
