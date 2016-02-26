// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del buscador de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("busquedaController", function($scope, $rootScope, busquedaRepository, expedienteRepository) {
    
    //Grupo de funciones de inicio
    $scope.init = function () {
        $rootScope.showTabs = true;
        ocultarView();
    };

    //Botón obtener la unidad dependiendo de la factura o vin
    $scope.busqueda = function(facturaVin){
        if(facturaVin == null || facturaVin == ''){
            alert('Ingrese un número de Factura o VIN');
            limpiar();
            ocultarView();         
        } 
        else {
            busquedaRepository.getUnidadFactura(facturaVin);
            $scope.vin = $rootScope.resultado.vin;
            $scope.numFactura = $rootScope.resultado.factura;
            $scope.tipo = $rootScope.resultado.tipo;
            $scope.modelo = $rootScope.resultado.modelo;
            $scope.marca = $rootScope.resultado.marca;
            if($rootScope.resultado == ''){
                limpiar();
                ocultarView();
            } 
            else{
                $scope.mostrarList = true;
                $scope.mostrar = true;  
            }                
        }        
    };

    $scope.seleccionar = function(vin){
        alert('La unidad se asignará a su usuario y no se podrá deshacer');        
        $rootScope.facturaVin = vin;
        alert(vin);
        alert($rootScope.data.idUsuario);
        busquedaRepository.updateLicitacionUnidad($rootScope.data.idUsuario, vin);
        location.href = '#/tab/expediente';
    };

    var ocultarView = function(){
        $scope.mostrarList = false;
        $scope.mostrar = false; 
    };

    var limpiar = function(){
        $scope.vin = '';
        $scope.numFactura = '';
        $scope.tipo = '';
        $scope.modelo = '';
        $scope.marca = '';
        ocultarView();
    };

    $scope.inserta = function(){
        busquedaRepository.insert('AAA', '1','Focus', 'Ford', '2016', 'ZAK214325235', 'Rojo', 'pendiente');
        busquedaRepository.insert('WWE', '2','Camioneta', 'Ford', '2010', 'YTRVCVFD5487', 'Blanco', 'pendiente');
    };
});