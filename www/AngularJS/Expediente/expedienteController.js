// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del expediente de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("expedienteController", function($scope, $route, $rootScope, expedienteRepository) {

    //Propiedades

    //Grupo de funciones de inicio
    $scope.init = function () {
    };

    $scope.data = [
        { id: 1, title: 'Foto Delantera', img: "/images/auto_delantera.jpg", status: "Pendiente"},
        { id: 2, title: 'Foto Trasera', img: "/images/auto_trasera.jpg" , status: "Pendiente"},
        { id: 3, title: 'Foto Izquierda', img: "/images/auto_izquierda.jpg", status: "Pendiente"},
        { id: 4, title: 'Foto Derecha',  img: "/images/auto_derecha.jpg", status: "Pendiente"},
        { id: 5, title: 'Foto Placa',  img: "/images/placa.jpg" , status: "Pendiente"} ,
        { id: 6, title: 'Tarjeta Circulación', img: "/images/tarjeta.jpg", status: "Pendiente"}        
    ];

    $scope.data2 = [
        { id: 1, title: 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7', VIN: '1FBAX2CM0FKA56032' , factura: 'AA000013433'}
    ]; 

    $scope.settings = { 
        lang: 'es',
        enhance: true
    }

    $scope.Alerta = function (){
        alert("Entra");
    }

    $scope.settings = {
        theme: 'mobiscroll',
        display: 'inline',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };

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

});