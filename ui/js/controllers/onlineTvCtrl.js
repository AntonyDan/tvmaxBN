var onlineTvCtrl = app.controller('onlineTvCtrl', function($scope, $http, channelsService, sessionService, userService) {
	'use strict';

	$scope.is_load = false;
	$scope.is_active = false;
	$scope.is_error = false;
	userService.getData($scope.access_token).then(function(userData) {
		$scope.is_load = true;
		if(userData.tv_account_id != null) {
		    $scope.is_active = userData.is_active;
			if($scope.is_active == true) {
				var playerOptions = {
					"default": false,
					"autostart": true,
					"label": "0",
					"type": "hls",
					"preload": "none",
					"primary": "html5",
					"hlshtml": true,
					"stretching": 'fill',
				};
			
				$scope.channels = [];
			
				$scope.selectedChannel = 0;
			
				$scope.setActive = function(channelId) {
					$scope.selectedChannel = channelId;
					sessionService.set('selectedChannel', channelId);
				};
			
				$scope.loadStream = function() {
					playerOptions.file = this.channel.url;		
					jwplayer('mediaPlayer').setup(playerOptions);
				};
			
				channelsService.getData($scope.access_token).then(function(data) {
					$scope.channels = data;
					if(sessionService.get('selectedChannel') != undefined) {
						$scope.selectedChannel = sessionService.get('selectedChannel');
						if(sessionService.get('selectedChannelUrl') != undefined) {
							playerOptions.file = sessionService.get('selectedChannelUrl');
							sessionService.destroy('selectedChannelUrl');//т.к. может стать не актуальным
						}
						else {
							angular.forEach($scope.channels, function(channel){
								if(channel.id == $scope.selectedChannel) {
									playerOptions.file = channel.url;
								}
							});
						}
					}
					else {
						$scope.selectedChannel = $scope.channels[0].id;
						playerOptions.file = $scope.channels[0].url;
					}
					jwplayer('mediaPlayer').setup(playerOptions);
				});
				
				$scope.jumpToUp = function() {
					var containerTop = angular.element(document.getElementById("container"))[0].offsetTop;
	                scrollTo(0, containerTop);
	            };
			}
		}
		else {
			$scope.is_error = true;
		}
	});
});
