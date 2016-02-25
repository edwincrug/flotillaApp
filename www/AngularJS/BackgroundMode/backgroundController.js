registrationModule.controller('backgroundController', function($scope, $cordovaSQLite, $rootScope, historialSincronizacionFactory){
  $scope.init = function(){
     document.addEventListener('deviceready', function() {
      cordova.plugins.backgroundMode.setDefaults({ 
          title:  'FlotillasApp',
          text:   'FlotillasApp ejecutándose.',
          ticker: 'FlotillasApp ejecutándose.'
      });
      cordova.plugins.backgroundMode.enable();

      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function() {
        historialSincronizacionFactory.insertSincronizacion('19/02/2016 04:33 p.m.', 4);
        $scope.historialSincronizacion = historialSincronizacionFactory.getHistorialSincronizacion();
        location.href = '#/tab/sincronizacion';
      }
    });
  }
});