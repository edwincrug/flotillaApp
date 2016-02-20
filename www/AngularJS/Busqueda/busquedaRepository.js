// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Repositorio de la busqueda de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var busquedaUrl = global_settings.urlCORS + '/api/flotillaapi/';

registrationModule.factory('busquedaRepository', function ($http) {
    return {
        getFlotilla: function (num) {
            return $http({
                url: busquedaUrl,
                method: "GET",
                params: { id: '2|' + num}
            });
        }
    };
});