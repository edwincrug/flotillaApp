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
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 01/11/2015',numDoc:'#Documentos: 5'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 02/11/2015',numDoc:'#Documentos: 3'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 03/11/2015',numDoc:'#Documentos: 2'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 04/11/2015',numDoc:'#Documentos: 7'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 05/11/2015',numDoc:'#Documentos: 6'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 06/11/2015',numDoc:'#Documentos: 25'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 07/11/2015',numDoc:'#Documentos: 55'},
        { imgsrc: 'clould-upload.png', fecha: 'Fecha de sincronización: 08/11/2015',numDoc:'#Documentos: 15'}
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