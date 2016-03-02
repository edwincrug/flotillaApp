registrationModule.controller('consultaController', function ($scope, consultaRepository, $rootScope) {
    
    $scope.expedientes = consultaRepository.getExpedientes($rootScope.data.idUsuario);

    $scope.$watch('expedientes', function() {
        //alert('Cambio expedientes');
    });

    
    
    /*
    $scope.Saludo = function () {
        alert('Invoca init');
        $scope.expedientes = consultaRepository.getExpedientes($rootScope.data.idUsuario);
        /* setInterval(function () {
             $scope.expedientes = [];
             $scope.showExpedientes();
         }, 3000);

    };*/

    $scope.showExpedientes = function () {
        $scope.expedientes = consultaRepository.getExpedientes($rootScope.data.idUsuario);
    }

    $scope.Detalle = function (expediente) {
        //alert(expediente.vin);
        $rootScope.facturaVin = expediente.vin;
        location.href = '#/tab/expediente';
    };

});