// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Controlador para el template de HistorialSincronizacion.html
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('historialSincronizacionController', function($scope, $route, $rootScope){

	//Grupo de funciones de inicio
    $scope.init = function () {
    	//$scope.getHistorialSincronizacion();
        $rootScope.logged = true;
    };

    //Obtiene la lista de sincronizaciones efectuadas por unidad
    $scope.getHistorialSincronizacion = function(){
    	historialSincronizacionFactory.getHistorialSincronizacion().then(function successCallback(response){
    		$scope.listaHistorialSincronizacion = response.data; 
    	},function errorCallback(response){
    		alert('Error al cargar el historial de sincronización');
    	});
    };

    //script para el funcionamiento del control GroupHeaders
    $scope.data = [
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 01/11/2015',vin:'Vin: 1FBAX2CM0FKA56032',numDoc:'#Documentos: 5'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 02/11/2015',vin:'Vin: 1FBAX2CM0FKA61277',numDoc:'#Documentos: 3'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 03/11/2015',vin:'Vin: 1FBAX2CM0FKA61280',numDoc:'#Documentos: 2'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 04/11/2015',vin:'Vin: 1FBAX2CM0FKA63899',numDoc:'#Documentos: 7'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 05/11/2015',vin:'Vin: 1FBAX2CM0FKA63904',numDoc:'#Documentos: 6'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 06/11/2015',vin:'Vin: 1FBAX2CM0FKA63918',numDoc:'#Documentos: 25'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 07/11/2015',vin:'Vin: 1FBAX2CM0FKA63921',numDoc:'#Documentos: 55'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha Sincronización: 08/11/2015',vin:'Vin: 1FBAX2CM0FKB14933',numDoc:'#Documentos: 15'}
    ];

    $scope.settings = {
        theme: 'mobiscroll',
        swipe: false,
        sortable: { handle: 'right' },
        enhance: true
    };

     $scope.settingsButton = {
        theme: 'mobiscroll'
    };  

});