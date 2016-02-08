// -- =============================================
// -- Author:      Edwin Cruz García
// -- Create date: 08/02/2016
// -- Description: Repositorio principal de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================

var mainUrl = global_settings.urlCORS + '/api/mainapi/';

registrationModule.factory('mainRepository', function ($http) {
    return {
        get: function () {
            return $http.get(mainUrl);
        }
    };
});