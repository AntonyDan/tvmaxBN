
var profileCtrl = app.controller('profileCtrl', function($scope, loginService, sessionService, userService) {
  'use strict';

  $scope.logout = function() {
    loginService.logout();
  };

  $scope.firstName = '';
  $scope.lastName = '';
  $scope.login = '';
  $scope.is_load = false;
  $scope.is_active = false;
  $scope.is_error = false;
  $scope.balance = 0;
  $scope.playlistUrl = '';

  userService.getData($scope.access_token).then(function(data) {
	if(data.tv_account_id != null) {
	    $scope.firstName = data.first_name;
	    $scope.lastName = data.last_name;
	    $scope.login = data.username;
	    $scope.is_active = data.is_active;
	    if(data.balance != undefined)
	    	$scope.balance = data.balance.toFixed(4);
	    $scope.playlistUrl = data.playlist_url;
	}
	else {
		$scope.is_error = true;
	}
	$scope.is_load = true;
  });
});
