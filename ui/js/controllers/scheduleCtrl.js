function fromJsonToObj(arr) {
	return arr.map(function(item) {
		return angular.fromJson(item);
	});
}
var scheduleCtrl = app.controller('scheduleCtrl', function($scope, $http, channelsService, scheduleService, sessionService, userService, $window, $rootScope) {
	'use strict';
	
	$scope.is_load = false;
	$scope.is_active = false;
	$scope.is_error = false;
	userService.getData($scope.access_token).then(function(userData) {
		$scope.is_load = true;
		if(userData.tv_account_id != null) {
		    $scope.is_active = userData.is_active;
			if($scope.is_active) {
				$scope.selectedChannel = {
					id: null,
					name: '',
					img: ''
				};
				
				var today = new Date(),
					yesterday = new Date().setDate(new Date().getDate() - 1),
					tomorrow = new Date().setDate(new Date().getDate() + 1);
			
				yesterday = new Date(yesterday);
				tomorrow = new Date(tomorrow);
			
				var todayStr = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2),
				 		yesterdayStr = yesterday.getFullYear() + '-' + ('0' + (yesterday.getMonth() + 1)).slice(-2) + '-' + ('0' + yesterday.getDate()).slice(-2),
						tomorrowStr = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);
			
				// Флаги для фильтрации расписания
				$scope.selectedDate = today;
				$scope.currentDay = todayStr;
				
				$scope.setChannel = function() {
					$scope.selectedChannel.id = this.channel.id;
					$scope.selectedChannel.name = this.channel.name;
					$scope.selectedChannel.img = this.channel.img;
					
					sessionService.set('selectedChannel', $scope.selectedChannel.id);
				};
			
				$scope.setDate = function() {
					$scope.currentDay = this.date.dateStr;
					$scope.selectedDate = this.date.date;
				};
			
				//загружает по дэфолту расписание на первый канал в выдаче и сегодня
				channelsService.getData($scope.access_token).then(function(data) {
					$scope.channels = data;
					
					if(sessionService.get('selectedChannel') != undefined) {
						$scope.selectedChannel.id = sessionService.get('selectedChannel');
					}
					else {
						$scope.selectedChannel.id = $scope.channels[0].id;
					}
					
					angular.forEach($scope.channels, function(channel){
						if(channel.id == $scope.selectedChannel.id) {
							$scope.selectedChannel.name = channel.name;
							$scope.selectedChannel.img = channel.img;
						}
					});
			
					scheduleService.getData($scope.access_token, {
						channel_id: $scope.selectedChannel.id,
						date: $scope.currentDay
					}).then(function(data) {
						$scope.schedule = fromJsonToObj(data.program);
					}).catch(function(e) {
						console.error(e);
					});
				});
			
				$scope.loadSchedule = function() {
					scheduleService.getData($scope.access_token, {
						channel_id: $scope.selectedChannel.id,
						date: $scope.currentDay
					}).then(function(data) {
						$scope.schedule = fromJsonToObj(data.program);
					}).catch(function(e) {
						console.error(e);
					});
				};
			
				$scope.dates = [{
						'date': yesterday,
						'dateStr': yesterdayStr
					},
					{
						'date': today,
						'dateStr': todayStr
					},
					{
						'date': tomorrow,
						'dateStr': tomorrowStr
					}
				];
				
				$scope.goToStream = function(url) {
					sessionService.set('selectedChannelUrl', url);
					$window.location.href = $rootScope.appUrl + '#/online-tv';
				};
				
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
