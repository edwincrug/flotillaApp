// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Controlador para el template de HistorialSincronizacion.html
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('historialSincronizacionController', function($scope, $rootScope, historialSincronizacionFactory){

    //Grupo de funciones de inicio
    $scope.init = function () {
        $scope.historialSincronizacion = historialSincronizacionFactory.getHistorialSincronizacion();
    };

    $scope.settings = {
        theme: 'mobiscroll',
        swipe: false,
        sortable: { handle: 'right' },
        enhance: true
    };

     $scope.settingsButton = {
        theme: 'mobiscroll'
    };  

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

});