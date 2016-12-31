'use strict';

angular.module('myApp.weatherChartsView')
.controller('WeatherChartsController', ['$scope', 'WeatherService', function($scope, WeatherService) {
    var self = this;
    self.load = load;
    $scope.size = 1000;
    $scope.title = "Wiatr";

    load("wind", "Wiatr");

    self.amChartOptions = {
        type: "serial",
        theme: "light",
        marginRight: 80,
        valueAxes: [{
            position: "left",
            title: $scope.title
        }],
        graphs: [{
            id: "g1",
            fillAlphas: 0.4,
            valueField: "value",
            balloonText: "<div style='margin:5px; font-size:19px;'><b>[[value]]</b></div>"
        }],
        chartScrollbar: {
            graph: "g1",
            scrollbarHeight: 80,
            backgroundAlpha: 0,
            selectedBackgroundAlpha: 0.1,
            selectedBackgroundColor: "#888888",
            graphFillAlpha: 0,
            graphLineAlpha: 0.5,
            selectedGraphFillAlpha: 0,
            selectedGraphLineAlpha: 1,
            autoGridCount: true,
            color: "#AAAAAA"
        },
        chartCursor: {
            categoryBalloonDateFormat: "JJ:NN, DD/MM",
            cursorPosition: "mouse"
        },
        categoryField: "date",
        categoryAxis: {
            minPeriod: "mm",
            parseDates: true
        },
        export: {
            enabled: true
        },
        data: []
    };

    function load(param, title) {
        WeatherService.filter(param, $scope.size).then(
            function(data) {
                $scope.title = title;
                $scope.$broadcast("amCharts.updateData", data, "weatherChart");
                $scope.$broadcast("amCharts.zoom", "weatherChart");
            },
            function(errResponse){
                console.error('Error while fetching param '+param);
            }
        );
    }

}]);