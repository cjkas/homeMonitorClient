'use strict';

myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/loginView'});
}]);

angular.module('myApp.loginView', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginView', {
    templateUrl: 'loginView/loginView.html',
    controller: 'LoginController',
    controllerAs: 'ctrl',
     access: {
        loginRequired: false,
        authorizedRoles: [USER_ROLES.all]
    }
  });
}]);

angular.module('myApp.weatherChartsView', ['ngRoute', 'amChartsDirective'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weatherChartsView', {
    templateUrl: 'weatherChartsView/weatherChartsView.html',
    controller: 'WeatherChartsController',
    controllerAs: 'ctrl',
     access: {
        loginRequired: true,
        authorizedRoles: [USER_ROLES.all]
    }
  });
}])

angular.module('myApp.weatherView', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weatherView', {
    templateUrl: 'weatherView/weatherView.html',
    controller : 'WeatherController',
    controllerAs : 'ctrl',
     access: {
        loginRequired: true,
        authorizedRoles: [USER_ROLES.all]
    }
  });
}])

angular.module('myApp.errorView', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/errorView/:errorCode', {
    templateUrl: 'errorView/errorView.html',
    controller : 'ErrorController',
    controllerAs : 'ctrl',
     access: {
        loginRequired: false,
        authorizedRoles: [USER_ROLES.all]
    }
  });
}])

angular.module('myApp.usersView', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider.when('/usersView', {
    templateUrl: 'usersView/usersView.html',
    controller: 'UsersController',
    controllerAs: 'ctrl',
     access: {
        loginRequired: true,
        authorizedRoles: [USER_ROLES.ADMIN]
    }
  });
})
