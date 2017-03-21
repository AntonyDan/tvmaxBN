var routerConfig = app.config(function ($routeProvider) {
	$routeProvider
		.when('/profile', {
			templateUrl: './views/profile.html',
			controller: 'profileCtrl',
			activeTab: 'profile'
		})
		.when('/online-tv', {
			templateUrl: './views/online-tv.html',
			controller: 'onlineTvCtrl',
			activeTab: 'online-tv'
		})
		.when('/schedule', {
			templateUrl: './views/schedule.html',
			controller: 'scheduleCtrl',
			activeTab: 'schedule'
		})
		.otherwise({
			redirectTo: '/profile'
		});
}).run(function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });
}); 
