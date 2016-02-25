// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Repositorio del expediente de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var busquedaUrl = global_settings.urlCORS + '/api/flotillaapi/';

registrationModule.factory('expedienteRepository', function($http,$rootScope, $cordovaSQLite) {
    $rootScope.expediente = [];
    $rootScope.countDocs = 0;
    return {
        /*getFlotilla: function (num) {
            return $http({
                url: busquedaUrl,
                method: "GET",
                params: { id: '2|' + num}
            });
        },*/
        insertDocumento: function(vin, factura, idDocumento, valor, estatus){
         var insert = "INSERT INTO UnidadPropiedad(vin, factura, idDocumento, valor, estatus) VALUES(?,?,?,?,?)";
            var update = "UPDATE UnidadPropiedad SET valor = ? WHERE vin= 'AA000013433'";
            var query = "SELECT * FROM UnidadPropiedad WHERE vin= 'AA000013433'";

            $cordovaSQLite.execute($rootScope.FlotillasDB, query).then(function(resultQuery){
                if(resultQuery.rows.length > 0){
                    $cordovaSQLite.execute($rootScope.FlotillasDB, update, [valor]).then(function(resultUPD){
                         alert("Se actualizó"); 
                    }, function(error){
                        alert(error+' Error al actualizar en [UnidadPropiedad]');
                    });
                } 
                else{
                    $cordovaSQLite.execute($rootScope.FlotillasDB, insert, [vin, factura, idDocumento, valor, estatus]).then(function(resultInsert){
                         alert("Se insertó"+ resultInsert.insertId); 
                    }, function(error){
                        alert(error+' Error al insertar en [UnidadPropiedad]');
                    });
                }       
            }, function(error){
              alert(error+' Error al obtener registros en [UnidadPropiedad]');
            });
        },
        getExpediente: function(){
            var query = "SELECT vin, factura, idDocumento, valor, estatus FROM UnidadPropiedad WHERE vin= 'AA000013433' ";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query).then(function(result){
                if(result.rows.length > 0){
                    for (var i = 0; i < result.rows.length; i++) {
                      $rootScope.expediente.push(result.rows.item(i));
                    }  
                    $rootScope.countDocs = result.rows.length;
                } 
                else{
                    console.log("No hay registros con" + ' ');
                }       
            }, function(error){
              console.log(error);
            });
        }
    };
});