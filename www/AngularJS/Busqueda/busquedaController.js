// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del buscador de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("busquedaController", function($scope,$rootScope, busquedaRepository) {
    //Grupo de funciones de inicio
    $scope.init = function () {
        $rootScope.showTabs = true;
        //localStorageService.set('location', window.location);
    };

    $scope.settings = {
        theme: 'mobiscroll'
    };

    //Botón obtener la flotilla dependiendo de la factura o vin
    $scope.busqueda = function(facturaVin){
        /*busquedaRepository.getFlotilla(facturaVin)
          .then(function successCallback(response) {
                $rootScope.data = response;
                alertFactory.success('Datos de flotillas cargados.');
          }, function errorCallback(response) {            
                alertFactory.info('No se encuentran datos con los criterios de búsqueda');
          });*/
          if(facturaVin == 'AA000013433' || facturaVin == '1FBAX2CM0FKA56032'){
            $scope.valor = true;
          } else{
            $scope.valor = false;
            alert('Registro no encontrado');
          }
    };

    $scope.seleccionar = function(){
        alert('La unidad se asignará a su usuario y no se podra deshacer');
        location.href = '#/expediente';
    }

    var hasStorage = typeof (Storage) !== 'undefined',
        message = $('#message'),
        messageTimer,
        listviewInst,
        contacts;

    contacts = [
        {
            id: 1,
            factura: 'AA000013433',
            vin: '1FBAX2CM0FKA56032',
            descripcion: 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7'
        }
    ];

    contacts = localStorage.contacts ? JSON.parse(localStorage.contacts) : contacts;

    $scope.contacts = contacts;

    $scope.contactSettings = {
        theme: $scope.theme,
        swipe: false,
        iconSlide: true,
        onThemeLoad: $scope.addFilter,
        context: $scope.context2,
        enhance: true,
        itemGroups: {
            contact: {
                swipe: true,
                stages: [
                    { percent: -30, color: '#e64d4f', icon: 'foundation-mail', text: 'EMAIL', action: $scope.mail },
                    { percent: 30, color: '#4ca94e', icon: 'phone', text: 'CALL', action: $scope.call }
                ]
            },
            phone: {
                tap: $scope.call
            },
            email: {
                tap: $scope.mail
            },
            address: {
                tap: $scope.navigate
            },
            filter: {
                tap: $scope.showCategoryFilter
            },
            newAppointment: {}
        },
        onInit: function () {
            $('.contact-hdr').removeClass('mbsc-lv-parent');
            listviewInst = $('#contacts').mobiscroll('getInst');
        }
    };

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

    $scope.settingsMenu = {
        theme: 'mobiscroll',
        display: 'top',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };

    $scope.open = function() {
        location.href = '#/perfil';
    }
});