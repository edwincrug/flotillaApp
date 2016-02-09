// -- =============================================
// -- Author:      Edwin Cruz García
// -- Create date: 08/02/2016
// -- Description: Controlador principal de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================

registrationModule.controller("mainController", ['$scope' , function ($scope, $rootScope, mainRepository) {

    //Propiedades
    $scope.var = 'Hello App';

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
    };

    //Grupo de funciones de inicio
    $scope.init = function () {

    };


}]);