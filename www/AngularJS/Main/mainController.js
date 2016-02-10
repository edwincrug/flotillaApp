registrationModule.controller('mainController', ['$scope' ,function($scope, $route, $rootScope, mainRepository) {
    //Propiedades
    $scope.helloWorld = 'Hello App';

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
    };

    //Grupo de funciones de inicio
    $scope.init = function () {

    };

    $scope.irBusqueda = function(){
    	location.href = '#/busqueda';
    }
}]);