registrationModule.controller('mainController', function($scope, $route, $rootScope, mainRepository) {
    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
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
                location.href = '#/perfil';
                break;
            default:
                break;
        }
    }

    $scope.settings = {
        theme: 'ios',
        display: 'top',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };
});