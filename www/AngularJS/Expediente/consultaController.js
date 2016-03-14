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
        location.href = '#/tab/expediente';
    };

});