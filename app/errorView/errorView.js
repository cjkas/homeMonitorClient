'use strict';

angular.module('myApp.errorView')
.controller('ErrorController', ['$scope', '$routeParams' function($scope, $routeParams) {
    var self = this;
    console.log("erorr "+routeParams.errorCode);
}]);