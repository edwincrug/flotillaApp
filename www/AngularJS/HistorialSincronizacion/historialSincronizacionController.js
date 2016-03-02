// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Controlador para el template de HistorialSincronizacion.html
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('historialSincronizacionController', function($scope, $rootScope, networkRepository, historialSincronizacionRepository,expedienteRepository){
    //Grupo de funciones de inicio
    $scope.init = function () {
       historialSincronizacionRepository.getHistorialSincronizacion().then(function(result){
       		$scope.historialSincronizacion = result;
       })
    };

    $scope.sincronizar = function(){
		networkRepository.verficaRed();
	    if($rootScope.network == true){
	    	//alert('entra si es wifi');
	      $scope.obtenerTotales();
	      historialSincronizacionRepository.getDistinctDocuments().then(function(file){
	        $scope.document = file;	        
	          for (var i = 0; i < $scope.document.length; i++) {
	          	$scope.getTotalLocal($scope.document[i].vin); 
	          		alert($scope.totalDocs == $scope.totalLocal.length);                             
	                 if($scope.totalDocs == $scope.totalLocal.length){
	                 	var unidad = {vin:$scope.document[i].vin, idDocumento:$scope.document[i].idDocumento, 
	                 	valor:$scope.document[i].valor, idUsuario:$rootScope.data.idUsuario, idLicitacion: $rootScope.idLicitacion,
	                 	numDocumentos: $scope.totalLocal.length};	                 	
	                    //inserta en BD servidor de UP
	                    historialSincronizacionRepository.updateUnidad(unidad)
	                    .then(function(success){
	                    	//actualiza el estatus a sincronizado BD local
	                    	historialSincronizacionRepository.updateEstatus(unidad)
	                    	.then(function(success){
	                    		//actualiza el estatus a sincronizado BD servidor
	                    		historialSincronizacionRepository.updateEstatusServer(unidad)
	                    		.then(function(success){
	                    			//se cargan las fotos al servidor
	                    			historialSincronizacionRepository.insertHistorial(unidad)
	                    			.then(function(success){
	                    				//se borran las fotos del telefono
	                    				deleteFile(unidad)
	                    				.then(function(success){
	                    					//borra los datos de la base local de UP 
	                    					historialSincronizacionRepository.deleteUPLocal(unidad)
	                    					.then(function(success){
	                    						//se cargan las fotos al servidor
	                    						//historialSincronizacionRepository.saveFile(unidad)
	                    						//.then(function(success){
	                    						//},function(error){
	                    							//alert('Error al guardar fotos');
	                    						//})
	                    					},function(error){
	                    						alert('Error al borrar datos de UP');
	                    					});
	                    				},function(error){
	                    					alert('Error al borrar fotos');
	                    				});
	                    			},function(error){
	                    				alert('No se pudo actualizar el historial');
	                    			});
	                    		},function(error){
	                    			alert('No se pudo actualizar el estatus server');
	                    		});
	                    	},function(error){
	                    		alert('No se pudo actualizar el estatus');
	                    	});	
	                    },function(error){
	                    	alert('No se pudo actualizar la unidad');	
	                    });
	                    
	                    
	                    //se cargan las fotos al servidor
	                    //historialSincronizacionRepository.saveFile(unidad);
	                    //Se inserta en tabla de sincronizacion
	                    //historialSincronizacionRepository.insertHistorial(unidad);
	                    //se borran las fotos del telefono
	                    //deleteFile(unidad);
	                    //borra los datos de la base local de UP 
	                    //historialSincronizacionRepository.deleteUPLocal(unidad);
	                    
	                 }
	          	}
	      });
	    }
	    location.href = '#/tab/sincronizacion';
    };

    //Elimina un archivo con ruta específica
    $scope.deleteFile = function(document){
    	 alert(document[0].valor);
         window.resolveLocalFileSystemURL(document[0].valor, function(fileEntry){
            alert(fileEntry.name);
            fileEntry.remove();
         }, function(error){
            alert(error);
         });
    }

    $scope.obtenerTotales = function(){
    	//historialSincronizacionRepository.getTotalPerfil().then(function(total){
	        $scope.totalDocs = 1;//total;
	    //});
    }

    $scope.getTotalLocal = function(vin){
    	historialSincronizacionRepository.getTotalLocal(vin).then(function(local){
    		$scope.totalLocal = local;
    	});
    }
});