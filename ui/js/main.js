/*
  100280
  082001
*/

var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngAnimate']);

app.run(function($rootScope, $location, $window, loginService) {
  'use strict';

  var routesPermission = ['/profile', '/online-tv', '/schedule'];

  $rootScope.appUrl = './';

  $rootScope.$on('$routeChangeStart', function() {
    if(routesPermission.indexOf($location.path()) !== -1 && !loginService.isLogged()) {
      $window.location.href = $rootScope.appUrl + 'login.html';
    }
  });
});
