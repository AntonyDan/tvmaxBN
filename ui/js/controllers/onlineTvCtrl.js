var onlineTvCtrl = app.controller('onlineTvCtrl', function($scope, $http, channelsService, sessionService) {
	'use strict';

	var playerOptions = {
		"default": false,
		"autostart": true,
		"label": "0",
		"type": "hls",
		"preload": "none",
		"primary": "html5",
		"hlshtml": true,
		"stretching": 'fill'
	};

	$scope.channels = [];

	$scope.selectedItem = 0;

	$scope.setActive = function(index) {
		$scope.selectedItem = index;
		// sessionService.set('selectedItem', $scope.selectedItem);
	};

	$scope.loadStream = function() {
		playerOptions.file = this.channel.url;
		console.log(this.channel.url);
		sessionService.set('selectedChannelUrl', this.channel.url);

		jwplayer('mediaPlayer').setup(playerOptions);
	};

  channelsService.getData($scope.access_token).then(function(data) {
		$scope.channels = data;
		playerOptions.file = $scope.channels[0].url;

		jwplayer('mediaPlayer').setup(playerOptions);
  });
});
