'use strict';

angular.module('myApp.weatherView')
.controller('WeatherController', ['$scope', 'WeatherService', '$interval', function($scope, WeatherService, $interval) {
    var self = this;
    var interval;
    self.probe;
    self.remaining;
    fetchLast();

    var check = function(){
        var elapsed = new Date() - self.probe.created;
        self.remaining = parseInt(600 - elapsed / 1000);
        if(self.remaining <= 0){
            $interval.cancel(interval);
            fetchLast();
        }
    }

    function fetchLast(){
        WeatherService.fetchLast()
            .then(
            function(d) {
                self.probe = d;
                interval = $interval(check, 1000);
            },
            function(errResponse){
                console.error('Error while fetching Contacts');
            }
        );
    }
    $scope.$on('$destroy', function(){
        $interval.cancel(interval);
    });

}]);