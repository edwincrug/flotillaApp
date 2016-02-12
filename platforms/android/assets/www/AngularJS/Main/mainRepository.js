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
	        login: function (usuario, password) {
	            // return $http.put(loginUrl + '1|' + usuario + '|' + password);
	            return $http({
	                url: loginUrl,
	                method: "POST",
	                params: { id: '3|' + usuario + '|' + password }
	            });
	        }
    };
});
