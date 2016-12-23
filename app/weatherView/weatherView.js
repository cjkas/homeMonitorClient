'use strict';

angular.module('myApp.weatherView', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider.when('/weatherView', {
    templateUrl: 'weatherView/weatherView.html',
    controller : 'WeatherController',
    controllerAs : 'ctrl',
     access: {
        loginRequired: true,
        authorizedRoles: [USER_ROLES.all]
    }
  });
})

.controller('WeatherController', ['$scope', 'WeatherService', function($scope, WeatherService) {
console.log("1");
    var self = this;

    self.probe;

    fetchLast();

    function fetchLast(){
        WeatherService.fetchLast()
            .then(
            function(d) {
                self.probe = d;
            },
            function(errResponse){
                console.error('Error while fetching Contacts');
            }
        );
    }

}]);