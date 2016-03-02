// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 26/02/2016
// -- Description: Repositorio para métodos de red
// -- Modificó: 
// -- Fecha: 
// -- =============================================

registrationModule.factory('networkRepository', function($rootScope) {
  return {
    verficaRed: function(){
       var networkState = navigator.connection.type;

          var states = {};
          states[Connection.UNKNOWN]  = 'Unknown connection';
          states[Connection.ETHERNET] = 'Ethernet connection';
          states[Connection.WIFI]     = 'WiFi connection :)';
          states[Connection.CELL_2G]  = 'Cell 2G connection';
          states[Connection.CELL_3G]  = 'Cell 3G connection';
          states[Connection.CELL_4G]  = 'Cell 4G connection';
          states[Connection.CELL]     = 'Cell generic connection';
          states[Connection.NONE]     = 'No network connection';

          if(states[networkState] === states[Connection.WIFI] ){
            alert('Connection type: ' + states[networkState]);
            $rootScope.network = true;
          }
    }
 };
});