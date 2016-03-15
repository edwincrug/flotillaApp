// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Controlador para el template de HistorialSincronizacion.html
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('historialSincronizacionController', function($scope, $rootScope, networkRepository, historialSincronizacionRepository,$cordovaFileTransfer){
	var numDoc = 0;
    //Grupo de funciones de inicio
    $scope.init = function () {
      loadHistorialSincronizacion();
    };

    var loadHistorialSincronizacion = function(){
    	historialSincronizacionRepository.getHistorialSincronizacion().then(function(result){
       		$scope.historialSincronizacion = result;
       })
    }

    $scope.sincronizar = function(){
	    var arrayImg = [];
	    var date = new Date();
	    networkRepository.verficaRed();
	    if($rootScope.network == true){
	      historialSincronizacionRepository.getDistinctDocuments().then(function(unidadVin){
	        if(unidadVin.length > 0){
	          angular.forEach(unidadVin, function(unidad, key){
          			historialSincronizacionRepository.obtenerLicitacion(unidad.vin).then(function(licitacion){
	                  	historialSincronizacionRepository.countDocuments($rootScope.data.idRol, unidad.vin).then(function(countDocument){
	                  		if(countDocument[0].totalRol == countDocument[0].totalUnidad){
		                  		numDoc += countDocument[0].totalUnidad;	                  		
		                  		historialSincronizacionRepository.obtenerDatos(unidad.vin).then(function(documento){
		                  			angular.forEach(documento, function(document, key2){
		                  				alert(document.valor);
		                  				arrayImg.push(document.valor);
		                  				//inserta en la BD Unidad Propiedad Servidor
			                            historialSincronizacionRepository.updateUnidad(document.vin,document.idDocumento,document.valor,$rootScope.data.idUsuario).then(function(updUnidad){
		                            	//Se cargan las imagenes en servidor
		                            	historialSincronizacionRepository.testFileUpload(document.vin,document.valor,document.idDocumento);
		                            	
		                            	//Se borran datos de BD Local
		                            	historialSincronizacionRepository.deleteUPLocal(document.vin);
		                        
		                            	//actualiza el estatus a sincronizado BD local
		                            	historialSincronizacionRepository.updateEstatus(document.vin);
		                            	//actualiza el estatus a sincronizado BD servidor
		       	                    	historialSincronizacionRepository.updateEstatusServer(document.vin,licitacion[0].idLicitacion);
			                            //Se borran las imagenes del telefono

			                            				                                                      		                       
			                            });
			                  		});

		                  			if(key == unidadVin.length-1){
		                            	historialSincronizacionRepository.insertHistorial(date,numDoc).then(function(success){
								       		historialSincronizacionRepository.getHistorialSincronizacion().then(function(result){
								       			//Se borran las imagenes del telefono
                                    			//deleteImage(arrayImg);   
								       			deleteImage(arrayImg);
										    	$scope.historialSincronizacion = result;					
										    	loadHistorialSincronizacion();
										    });
							            });							            
			                        } 
		                  		});	
	                  		}
	                  		
	                  	});
	                });
	          });       
	        }
	      });
		}
	}

	var deleteImage = function(arrayImg){
		for (var i = 0; i < arrayImg.length; i++) {
			historialSincronizacionRepository.deleteImageURL(arrayImg[i]);
		}
	}
});