'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'http-auth-interceptor',
  'myApp.weatherView',
  'myApp.weatherChartsView',
  'myApp.loginView',
  'amChartsDirective'
]);
myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/loginView'});
}]);

var USER_ROLES =  {
    all: '*',
    admin: 'ADMIN',
    user: 'USER'
};

myApp.run(['$rootScope', '$location', '$http', 'AuthSharedService', 'Session','$q', '$timeout', function ($rootScope, $location, $http, AuthSharedService, Session, $q, $timeout) {

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
        console.log('login confirmed start ' + data);
            Session.create(data);
            $rootScope.account = Session;
            $rootScope.authenticated = true;
            $location.path("/weatherView").replace();
    });

    // Call when the 401 response is returned by the server
    $rootScope.$on('event:auth-loginRequired', function (event, data) {
            console.log("log required");
            Session.invalidate();
            $rootScope.authenticated = false;
            $rootScope.loadingAccount = false;
            $location.path('/loginView');
    });

    // Call when the 403 response is returned by the server
    $rootScope.$on('event:auth-forbidden', function (rejection) {
    console.log("log forbidden");
        $rootScope.$evalAsync(function () {
            $location.path('/error/403').replace();
        });
    });

    // Call when the user logs out
    $rootScope.$on('event:auth-loginCancelled', function () {
    console.log("log loginCancelled");
        $location.path('/loginView').replace();
    });

    // Get already authenticated user account
    AuthSharedService.getAccount();


}]);