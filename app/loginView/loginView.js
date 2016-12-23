'use strict';

angular.module('myApp.loginView', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider.when('/loginView', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginController',
    controllerAs: 'ctrl',
     access: {
        loginRequired: false,
        authorizedRoles: [USER_ROLES.all]
    }
  });
})

.controller('LoginController', ['$scope', 'AuthSharedService', '$rootScope', function($scope, AuthSharedService, $rootScope) {
    var self = this;
    self.user = {username : "", password: ""};
    self.userRegister = {login : "", password: ""};

    self.login = login;
    self.register = register;

    function register(){
        AuthSharedService.createAccount(self.userRegister);
    }

    function login(){
    console.log("self.user.username "+self.user.username);
        $rootScope.authenticationError = false;
                AuthSharedService.login(self.user);
    }

    function registered(){
        console.log("registered");
        resetRegister();
    }

    function resetRegister(){
        self.userRegister = {login : "", password: ""};
        $scope.registerForm.$setPristine(); //reset Form
    }

}]);