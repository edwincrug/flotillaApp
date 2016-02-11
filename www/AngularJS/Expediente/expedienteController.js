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
        { id: 1, title: 'Foto Delantera', img: "/images/auto_delantera.png", status: "Pendiente"},
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
});