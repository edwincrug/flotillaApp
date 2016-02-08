registrationModule.controller("mainController", function ($scope, $rootScope, mainRepository) {

    //Propiedades
    $scope.var = 'Hello App';

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
    };

    //Grupo de funciones de inicio
    $scope.init = function () {

    };


});