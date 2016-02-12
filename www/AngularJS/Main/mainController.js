registrationModule.controller('mainController', ['$scope' ,function($scope, $route, $rootScope, mainRepository) {
    //Propiedades
    $scope.helloWorld = 'Hello App';

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
    };

    //Grupo de funciones de inicio
    $scope.init = function () {
        $scope.location = window.location;
    };

    $scope.irBusqueda = function(){
        location.href = '#/expediente';
    }

    $scope.irLogin = function(){
        location.href = '#/login';
    }

    $scope.redireccion = function(page){
        switch(page){
            case 1:
                location.href = '#/busqueda';
                break;
            case 2:
                location.href = '#/consulta';
                break;
            case 3:
                location.href = '#/historialSincronizacion';
                break;
            case 4:
                location.href = '#/cuenta';
                break;
            default:
                break;
        }
    }

    $scope.settings = {
        theme: 'ios',
        display: 'inline',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };
}]);