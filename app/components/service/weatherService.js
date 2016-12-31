'use strict';

myApp.factory('WeatherService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = URL+'/weather';

    var factory = {
        fetchLast: fetchLast,
        filter: filter
    };

    return factory;

    function fetchLast() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "/last")
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching last');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    function filter(param, size) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "/filter/" + param + "/" + size)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching filter '+param);
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);