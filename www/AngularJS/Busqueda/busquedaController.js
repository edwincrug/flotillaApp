// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del buscador de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("busquedaController", function($scope, $rootScope, busquedaRepository, historialSincronizacionRepository, consultaRepository,expedienteRepository) {
    
    //Grupo de funciones de inicio
    $scope.init = function () {
        getServerRolDocuments();
        $rootScope.showTabs = true;
        ocultarView();
    };

    $scope.message = function(){
        historialSincronizacionRepository.getMessage();
    }
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
            $rootScope.idLicitacion = $rootScope.resultado.idLicitacion;
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
        busquedaRepository.updateLicitacionUnidad($rootScope.data.idUsuario, vin);
        $rootScope.expedientes = consultaRepository.getExpedientes($rootScope.data.idUsuario);
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

    var getServerRolDocuments  = function(){
        expedienteRepository.existsRolDocuments().then(function(numDocuments){
            //alert(numDocuments[0].NumRows);
            if(numDocuments[0].NumRows > 0){
                alert("ya existen registros [RolDocumento]");
            }
            else
            {
                expedienteRepository.getServerRolDocuments().then(function(response){
                    $scope.listDocuments = response.data;
                    //alert($scope.listDocuments.length);
                    if($scope.listDocuments.length > 0){
                        for(var i=0; i < $scope.listDocuments.length; i++){                    
                        var rolDocument = {idRol:$scope.listDocuments[i].idRol, orden:$scope.listDocuments[i].orden, idDocumento:$scope.listDocuments[i].idDocumento, tituloDoc:$scope.listDocuments[i].tituloDoc, valor:$scope.listDocuments[i].valor, tipo:$scope.listDocuments[i].tipo, estatus:$scope.listDocuments[i].estatus};
                            expedienteRepository.insertRolDocuments(rolDocument).then(function(result){
                            },function(err){
                                alert('Error al insertar en [RolDocumento]');
                            });
                        }
                    }
                },function(err){
                    alert("Error al obtener Documentos [Servidor]");
                }) 
            }
        },function(error){
            alert("Error al recuperar información.");
        }); 
     };
});