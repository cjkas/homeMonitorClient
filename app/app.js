'use strict';

var URL = "http://192.168.0.33:8080";

var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'http-auth-interceptor',
  'myApp.weatherView',
  'myApp.weatherChartsView',
  'myApp.loginView',
  'myApp.usersView',
  'amChartsDirective',
  'angular-loading-bar'
]);


myApp.run(['$rootScope', '$location', '$http', 'AuthSharedService', 'Session','$q', '$timeout', '$log', function ($rootScope, $location, $http, AuthSharedService, Session, $q, $timeout, $log) {

    $rootScope.$on('$routeChangeStart', function (event, next) {

        if(next.originalPath === "/loginView" && $rootScope.authenticated) {
            event.preventDefault();
        } else if (next.access && next.access.loginRequired && !$rootScope.authenticated) {
            event.preventDefault();
            $rootScope.$broadcast("event:auth-loginRequired", {});
        } else if (next.access && !AuthSharedService.isAuthorized(next.access.authorizedRoles)) {
            event.preventDefault();
            $rootScope.$broadcast("event:auth-forbidden", {});
        }
    });

    // Call when the the client is confirmed
    $rootScope.$on('event:auth-loginConfirmed', function (event, data) {
        $log.log('login confirmed start ' + data);
            Session.create(data);
            $rootScope.account = Session;
            $rootScope.authenticated = true;
            $location.path("/weatherView").replace();
    });

    // Call when the 401 response is returned by the server
    $rootScope.$on('event:auth-loginRequired', function (event, data) {
            $log.log("log required");
            Session.invalidate();
            $rootScope.authenticated = false;
            $rootScope.loadingAccount = false;
            $location.path('/loginView');
    });

    // Call when the 403 response is returned by the server
    $rootScope.$on('event:auth-forbidden', function (rejection) {
    $log.log("log forbidden");
        $rootScope.$evalAsync(function () {
            $location.path('/errorView/403').replace();
        });
    });

    // Call when the user logs out
    $rootScope.$on('event:auth-loginCancelled', function () {
    $log.log("log loginCancelled");
        $location.path('/loginView').replace();
    });

    // Get already authenticated user account
    AuthSharedService.getAccount();


}]);