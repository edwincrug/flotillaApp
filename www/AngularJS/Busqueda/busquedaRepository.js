// -- =============================================
// -- Author:      Mario A. Mejía Ramírez
// -- Create date: 08/02/2016
// -- Description: Repositorio de la busqueda de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.factory('busquedaRepository', function ($rootScope, $cordovaSQLite) {
	var busqueda = [];
    $rootScope.resultado = [];
    return {
        getUnidadFactura: function (facturaVin) {
            var query = "SELECT vin, factura, tipo, modelo, marca FROM LicitacionUnidad where factura = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [facturaVin]).then(function(result){
            	if(result.rows.length > 0){
                    $rootScope.resultado = result.rows.item(0);
            	} 
                else if(result.rows.length == 0){
                    var query = "SELECT vin, factura, tipo, modelo, marca FROM LicitacionUnidad where vin = ?";
                    $cordovaSQLite.execute($rootScope.FlotillasDB, query, [facturaVin]).then(function(result){
                        if(result.rows.length > 0){
                            $rootScope.resultado = result.rows.item(0);
                        }
                        else{
                            alert("No se encuentran unidades con el criterio de búsqueda");
                            $rootScope.resultado = '';

                        }
                    }, function(error){
                        console.log(error);
                    });
                    return busqueda;   
                }
            	else{
            		alert("No se encuentran unidades con el criterio de búsqueda");
                    $rootScope.resultado = '';
            	}
            }, function(error){
            	console.log(error);
            });
            return busqueda;       	
        },
		insert: function(vin, factura,tipo, marca, modelo, numeroMotor, color, estatus){
		    var query = "INSERT INTO LicitacionUnidad (vin,factura,tipo, marca, modelo, numeroMotor, color, estatus) VALUES(?,?,?,?,?,?,?,?)";
		    $cordovaSQLite.execute($rootScope.FlotillasDB, query, [vin, factura, tipo, marca, modelo, numeroMotor, color, estatus]).then(function(result){
            }, function(error){
		      	alert('error en el insert');
		    });
		},
        updateLicitacionUnidad: function(usuarioAsignado, vin){
            var update = "UPDATE LicitacionUnidad SET usuarioAsignado = ? WHERE vin = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB,update,[usuarioAsignado, vin]).then(function (result) {
                alert('update');                
            }, function (error) {
               alert('error en el update');
            });
        }
    };
});