var mainUrl = global_settings.urlCORS + '/api/mainapi/';

registrationModule.factory('mainRepository', function ($http) {
    return {
        get: function () {
            return $http.get(mainUrl);
        }
    };
});