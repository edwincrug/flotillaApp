registrationModule.controller('mainController', ['$scope' ,function($scope, $route, $rootScope, mainRepository) {
    /*$scope.firstName = "John";
    $scope.lastName = "Doe";

        //Grupo de funciones de inicio
    $scope.init = function () {

    };

    $scope.irPag1 = function(){
    	location.href="#/pag1";
    }*/

    //Propiedades
    $scope.helloWorld = 'Hello App';

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
    };

    //Grupo de funciones de inicio
    $scope.init = function () {

    };
}]);