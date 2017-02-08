
var profileCtrl = app.controller('profileCtrl', function($scope, loginService, sessionService, userService) {
  'use strict';

  $scope.logout = function() {
    loginService.logout();
  };

  $scope.firstName = '';
  $scope.lastName = '';
  $scope.login = '';
  $scope.playlistUrl = '';

  userService.getData($scope.access_token).then(function(data) {
    $scope.firstName = data.first_name;
    $scope.lastName = data.last_name;
    $scope.login = $scope.firstName + ' ' + $scope.lastName;
    $scope.playlistUrl = data.playlist_url;
  });
});
