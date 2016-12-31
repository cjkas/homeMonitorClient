'use strict';

var USER_ROLES = {
    all: '*',
    admin: 'ADMIN',
    user: 'USER'
};

angular.module('myApp').service('Session', function () {
    this.create = function (data) {
        this.id = data.id;
        this.login = data.login;
        this.name = data.name;
        this.email = data.email;
        this.version = data.version;
        this.role = data.role;
    };
    this.invalidate = function () {
        this.id = null;
        this.login = null;
        this.name= null;
        this.email = null;
        this.version = null;
        this.role = null;
    };
    return this;
});

angular.module('myApp').service('AuthSharedService', ['$rootScope', '$http', '$resource', 'authService', 'Session', function ($rootScope, $http, $resource, authService, Session) {

    return {
        login: function (user) {
            var config = {
                ignoreAuthModule: 'ignoreAuthModule'
            };
            $http.post(URL+'/authenticate', user, config)
                .success(function (data) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                    authService.loginConfirmed(data.user);
                })
                .error(function (data) {
                    $rootScope.authenticationError = true;
                    Session.invalidate();
                });
        },
        getAccount: function () {
            $rootScope.loadingAccount = true;
            $http.get(URL+'/security/account')
                .then(function (response) {
                    authService.loginConfirmed(response.data);
                });
        },
        isAuthorized: function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                if (authorizedRoles == '*') {
                    return true;
                }
                authorizedRoles = [authorizedRoles];
            }
            var isAuthorized = false;
            angular.forEach(authorizedRoles, function (authorizedRole) {
                var authorized = (!!Session.login &&
                Session.role === authorizedRole);
                if (authorized || authorizedRole == '*') {
                    isAuthorized = true;
                }
            });
            return isAuthorized;
        },
        logout: function () {
            $rootScope.authenticationError = false;
            $rootScope.authenticated = false;
            $rootScope.account = null;
            $http.get(URL+'/logout');
            Session.invalidate();
            authService.loginCancelled();
        }
    };
}]);