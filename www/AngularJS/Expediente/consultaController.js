registrationModule.controller('consultaController', function ($scope, consultaRepository, $rootScope) {

    $scope.init = function () {
        alert('Invoca init');
        $scope.showExpedientes();
        setInterval(function () {
            $scope.showExpedientes();
        }, 5000);

    };


    $scope.showExpedientes = function () {
        consultaRepository.getExpedientes($rootScope.data.idUsuario).then(function successCallback(response) {
            $scope.expedientes = response;
        }, function errorCallback(response) {
            alert("No recupera expedientes");
        });
    }

    $scope.Detalle = function (expediente) {
        $rootScope.vin = expediente.vin;
        location.href = '#/tab/expediente';
    };

});