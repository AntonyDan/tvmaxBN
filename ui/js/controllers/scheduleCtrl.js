var scheduleCtrl = app.controller('scheduleCtrl', function($scope, $http, channelsService, scheduleService) {
	'use strict';

	$scope.selectedItem = 0;
	$scope.selectedDate = 1;

	$scope.setActive = function(index, list) {
		if(list === 'dates') $scope.selectedDate = index;
		else $scope.selectedItem = index;
	};

	function fromJsonToObj(arr) {
		return arr.map(function(item) {
			return angular.fromJson(item);
		});
	}

	var today = new Date(),
			yesterday = new Date().setDate(new Date().getDate() - 1),
			tomorrow = new Date().setDate(new Date().getDate() + 1);

	yesterday = new Date(yesterday);
	tomorrow = new Date(tomorrow);

	var todayStr = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2),
	 		yesterdayStr = yesterday.getFullYear() + '-' + ('0' + (yesterday.getMonth() + 1)).slice(-2) + '-' + ('0' + yesterday.getDate()).slice(-2),
			tomorrowStr = tomorrow.getFullYear() + '-' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);

	// Флаги для фильтрации расписания
	$scope.currentChannel = {
		id: null,
		name: '',
		img: ''
	};

	$scope.currentDay = todayStr;

	$scope.setChannel = function() {
		$scope.currentChannel.id = this.channel.programme_id;
		$scope.currentChannel.name = this.channel.name;
		$scope.currentChannel.img = this.channel.img;
	};

	$scope.setDate = function() {
		$scope.currentDay = this.date.dateStr;
	};

	//загружает по дэфолту расписание на первый канал в выдаче и сегодня
  channelsService.getData($scope.access_token).then(function(data) {
		$scope.channels = data;

		$scope.currentChannel.id = $scope.channels[0].programme_id;
		$scope.currentChannel.name = $scope.channels[0].name;
		$scope.currentChannel.img = $scope.channels[0].img;

		scheduleService.getData($scope.access_token, {
			channel_id: $scope.currentChannel.id,
			start: $scope.currentDay + ' 00:00:00',
      stop: $scope.currentDay + ' 23:59:59'
		}).then(function(data) {
			$scope.schedule = fromJsonToObj(data);
		}).catch(function(e) {
			console.error(e);
		});
  });

	$scope.loadSchedule = function() {
		console.log($scope.currentDay);
		scheduleService.getData($scope.access_token, {
			channel_id: $scope.currentChannel.id,
			start: $scope.currentDay + ' 00:00:00',
      stop: $scope.currentDay + ' 23:59:59'
		}).then(function(data) {
			$scope.schedule = fromJsonToObj(data);
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
});
