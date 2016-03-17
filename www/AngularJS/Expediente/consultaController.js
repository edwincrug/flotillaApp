// -- =====================================================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 01/03/2016
// -- Description: Controlador que devuelve todos los expedientes asignados al usuario
// -- Modificó: 
// -- Fecha: 
// -- =====================================================================

registrationModule.controller('consultaController', function ($scope, consultaRepository, $rootScope) {

    $scope.init = function () {
        $scope.showExpedientes();
        setInterval(function () {
            $scope.showExpedientes();
        }, 5000);

    };

    $scope.showExpedientes = function () {
        consultaRepository.getExpedientes($rootScope.data.idUsuario).then(function(response) {
            $scope.expedientes = response;
        }, function(error) {
            alert("No recupera expedientes");
        });
    }

    $scope.Detalle = function (expediente) { 
        $rootScope.expVin = expediente.vin;
        $rootScope.expFactura = expediente.factura;
        if(expediente.estatus == 'Sincronizado'){
            alert("Unidad sincronizada");
        } else{
            location.href = '#/tab/expediente';
        }       
    };

});