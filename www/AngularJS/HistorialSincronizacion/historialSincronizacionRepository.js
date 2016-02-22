// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Repositorio de métodos para el manejo del Historial de Sincronizaciones
// -- Modificó: 
// -- Fecha: 
// -- =============================================
//var historialSincronizacionUrl = global_settings.urlCORS + '/api/usuarioapi/';

registrationModule.factory('historialSincronizacionFactory', function($cordovaSQLite, $rootScope){

var historialSincronizacion = [];
	return{
		getHistorialSincronizacion: function(){
			var query = "SELECT fecha, numDocumentos FROM HistorialSincronizacion";
			$cordovaSQLite.execute($rootScope.FlotillasDB, query, []).then(function(result){
			    if(result.rows.length > 0){
			        //alert("SELECTED ->"+ result.rows.item(0).id+ " " + result.rows.item(0).firstName + " "+ result.rows.item(0).lastName);
			        for (var i = 0; i < result.rows.length; i++) {
			          historialSincronizacion.push(result.rows.item(i));
			        }  
			    } 
			    else{
			        alert("NO ROWS EXISTS");
			    }       
		    }, function(error){
		      console.log(error);
		    });
		    return historialSincronizacion;
		},
		insertSincronizacion: function(fecha, numDoc){
		    var query = "INSERT INTO HistorialSincronizacion (fecha, numDocumentos) VALUES(?,?)";
		    $cordovaSQLite.execute($rootScope.FlotillasDB, query, [fecha, numDoc]).then(function(result){
		     	 //alert("this record was inserted:"+ result.insertId); 
		    }, function(error){
		      	alert(error);
		    });
		}
	}
});