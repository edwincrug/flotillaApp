// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del buscador de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("busquedaController", function($scope, $rootScope, $ionicLoading, $cordovaBarcodeScanner,busquedaRepository, historialSincronizacionRepository, consultaRepository,expedienteRepository) {
    
    //Grupo de funciones de inicio
    $scope.init = function () {
        getServerRolDocuments();
        $rootScope.showTabs = true;
        ocultarView();
    };

    $scope.message = function(){
        shistorialSincronizacionRepository.getMessage();
    }
    //Botón obtener la unidad dependiendo de la factura o vin
    $scope.busqueda = function(facturaVin){
        if(facturaVin == null || facturaVin == ''){
            alert('Ingrese un número de Factura o VIN');
            ocultarView();         
        } 
        else {
            $ionicLoading.show({
                template: 'Buscando...'
            });

            busquedaRepository.getUnidadFactura(facturaVin).then(function(unidad){
                $ionicLoading.hide();
                if(unidad.length > 0){
                    $scope.unidad = unidad;
                    $scope.mostrarList = true;
                    $scope.mostrar = true;
                }
                else{
                    limpiar();
                }
            },function(error){
                $ionicLoading.hide();
                alert("error");
            });            
        } 
    };

    $scope.seleccionar = function(){
        busquedaRepository.validateLicitacionAssignment($rootScope.data.idUsuario, $scope.unidad[0].vin).then(function(unidadAsigando){
            if(unidadAsigando[0].NumRows > 0){
                alert("La unidad ya se encuentra asignada");
                location.href = '#/tab/consultaExpediente';
                limpiar();
            }
            else{
                alert('La unidad se asignará a su usuario y no se podrá deshacer');        
                busquedaRepository.updateLicitacionUnidad($rootScope.data.idUsuario, $scope.unidad[0].vin).then(function(unidad){
                    location.href = '#/tab/consultaExpediente';
                    limpiar();
                },function(error){
                    alert("Error al asignar unidad. ");
                });
            }
        },function(error){
            alert("Error al obtener información en [LicitacionUnidad]");
        });
    };

    var ocultarView = function(){
        $scope.mostrarList = false;
        $scope.mostrar = false; 
    };

    var limpiar = function(){
        $scope.unidad = null;
        ocultarView();
    };

    var getServerRolDocuments  = function(){
        expedienteRepository.existsRolDocuments().then(function(numDocuments){
            if(numDocuments[0].NumRows > 0){
                console.log("ya existen registros [RolDocumento]");
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
                                console.log('Error al insertar en [RolDocumento]');
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

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
        }, function(error) {
            alert("An error happened -> " + error);
        });
    };
});