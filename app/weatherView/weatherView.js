'use strict';

angular.module('myApp.weatherView')
.controller('WeatherController', ['$scope', 'WeatherService', function($scope, WeatherService) {
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