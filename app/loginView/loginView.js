'use strict';

angular.module('myApp.loginView').controller('LoginController', ['$scope', 'AuthSharedService', '$rootScope', function($scope, AuthSharedService, $rootScope) {
    var self = this;
    self.user = {username : "", password: ""};

    self.login = login;

    function login(){
        $rootScope.authenticationError = false;
        AuthSharedService.login(self.user);
    }

}]);