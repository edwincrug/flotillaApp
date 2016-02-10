// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del buscador de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("busquedaController", function ($scope, $rootScope, busquedaRepository) {

    //Propiedades

    //Grupo de funciones de inicio
    $scope.init = function () {
    };

    $scope.settings = {
        theme: 'mobiscroll'
    };

    //Botón obtener la flotilla dependiendo de la factura o vin
    $scope.busqueda = function(facturaVin){
         $scope.valor = true;
        busquedaRepository.getFlotilla(facturaVin)
          .then(function successCallback(response) {
                $rootScope.data = response;
                alertFactory.success('Datos de flotillas cargados.');
          }, function errorCallback(response) {            
                alertFactory.info('No se encuentran datos con los criterios de búsqueda');
          });
    };

    var ids = 1;

    $scope.data = [
        { id: 1, title: 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7', VIN: '1FBAX2CM0FKA56032' , factura: 'AA000013433'}
    ];  

    $scope.seleccionar = function(){
        alertFactory.info('La unidad se asignará a su usuario y no se podra deshacer');
    } 
});