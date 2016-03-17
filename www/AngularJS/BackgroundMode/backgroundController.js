registrationModule.controller('backgroundController', function($scope, $cordovaSQLite, $rootScope, networkRepository,historialSincronizacionRepository){
  var numDoc = 0;
  var arrayImg = [];
  var date = new Date();
  $scope.init = function(){
     $rootScope.lockBackgroundMode = 0;
     document.addEventListener('deviceready', function() {
      cordova.plugins.backgroundMode.setDefaults({ 
          title:  'FlotillasApp',
          text:   'FlotillasApp ejecutándose.',
          ticker: 'FlotillasApp ejecutándose.'
      });
      cordova.plugins.backgroundMode.enable();

      //Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function() {
        if($rootScope.lockBackgroundMode !== 1)
        {           
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
                                        });
                                  });

                                  if(key == unidadVin.length-1){
                                    historialSincronizacionRepository.generaDetalleSincronizacion($rootScope.data.idUsuario, unidad.vin);
                                    historialSincronizacionRepository.insertHistorial(date,numDoc).then(function(success){
                                      historialSincronizacionRepository.getHistorialSincronizacion().then(function(result){
                                        $scope.historialSincronizacion = result;
                                        location.href = '#/tab/sincronizacion';
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
          /////
        }        
      }
    });
  }
});