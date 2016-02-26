registrationModule.controller("loginController", function ($scope, $rootScope, $state, loginRepository, $cordovaSQLite, perfilRepository, busquedaRepository) {
    $rootScope.data = [];
    $scope.licitacion = [];
    //Grupo de funciones de inicio
    $scope.init = function () {
        $rootScope.logged = false;
        $rootScope.showTabs = false;
    };

    $scope.iniciarSesion = function (usuario, password) {
        loginRepository.login(usuario, password)
            .then(function successCallback(response) {
                $rootScope.data = response.data;
                if ($rootScope.data == null) {
                    $scope.password = '';
                    alert("El nombre de usuario o contraseña son incorrectos, verifique");
                } else {

                    $rootScope.data.usuario = usuario;
                    $rootScope.data.password = password;
                    perfilRepository.insertDatosUsuario($rootScope.data.idUsuario, $rootScope.data.nombreCompleto, usuario, $rootScope.data.idRol, password);
                    
                    busquedaRepository.getLicitacion()
                    .success(getFlotillaSuccessCallback)
                    .error(errorCallBack);
                    
                    alert('Login desde WebApi');
                    location.href = '#/tab/busqueda';

                    $cordovaFile.createFile(cordova.file.dataDirectory, "flotillasCredentials.txt", false)
                        .then(function (success) {
                            $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "flotillasCredentials.txt",
                                    "user:" + usuario + "|pass:" + password)
                                .then(function (success) {
                                    //alert('escribio');
                                }, function (error) {
                                    //alert('no escribio: ' + error.code);
                                });
                        }, function (error) {
                            alert('no crea el archivo: ' + error.code);
                        });
                    $rootScope.ingresa = true;
                }
            }, function errorCallback(response) {
                alert("Ocurrio un problema, inténtelo más tarde");
            });
    };

    $scope.irRegistro = function () {
        location.href = '#/registro';
    }

    $scope.validaCredencialesLocales = function (usuario, password) {
        alert('Registros desde el root: ' + $rootScope.totalRegistros);
        if ($rootScope.totalRegistros == 0) {
            $scope.iniciarSesion(usuario, password);
        } else {
            var query = "SELECT * FROM DatosUsuario WHERE nombreUsuario = ? AND password = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [usuario, password]).then(function (result) {
                if (result.rows.length > 0) {

                    $rootScope.data.idUsuario = result.rows.item(0).idUsuario;
                    $rootScope.data.nombreCompleto = result.rows.item(0).nombreCompleto;
                    $rootScope.data.usuario = usuario;
                    $rootScope.data.idRol = result.rows.item(0).idRol;
                    $rootScope.data.password = password;
                    $rootScope.data.rol = result.rows.item(0).descripcionRol;

                    location.href = '#/tab/busqueda';
                } else {
                    alert("El nombre de usuario o contraseña son incorrectos, verifique");
                }
            }, function (error) {
                alert('Problemas para consultar la BD');
            });
        }

    };

    //Succes obtiene lista de objetos de las flotillas
    var getFlotillaSuccessCallback = function (data, status, headers, config) {
        var query = "INSERT INTO LicitacionUnidad (vin, factura, idLicitacion, tipo, marca, modelo, numeroMotor, color, estatus, usuarioAsignado) VALUES ";
        $scope.licitacion = data;
        for (var i = 0;  i <= 450; i++) {
            $scope.licitacion[i].vin;
            $scope.licitacion[i].factura;
            $scope.licitacion[i].idLicitacion;
            $scope.licitacion[i].tipo;
            $scope.licitacion[i].marca;
            $scope.licitacion[i].modelo;
            $scope.licitacion[i].numeroMotor;
            $scope.licitacion[i].color;
            $scope.licitacion[i].estatus;
            query += "('" + $scope.licitacion[i].vin + "', '" + $scope.licitacion[i].factura + "' , " + $scope.licitacion[i].idLicitacion + ", '" + $scope.licitacion[i].tipo + "', '" + $scope.licitacion[i].marca + "', '" + $scope.licitacion[i].modelo + "', '" + $scope.licitacion[i].numeroMotor + "', '" + $scope.licitacion[i].color + "', '" + $scope.licitacion[i].estatus + "',0), ";
        }
        query = query.substring(0, query.length-2);
        busquedaRepository.insertaLicitacion(query);
        alert('primeros 450');

        var query2 = "INSERT INTO LicitacionUnidad (vin, factura, idLicitacion, tipo, marca, modelo, numeroMotor, color, estatus, usuarioAsignado) VALUES ";
        $scope.licitacion = data;
        for (var i = 451;  i <=  900; i++) {
            $scope.licitacion[i].vin;
            $scope.licitacion[i].factura;
            $scope.licitacion[i].idLicitacion;
            $scope.licitacion[i].tipo;
            $scope.licitacion[i].marca;
            $scope.licitacion[i].modelo;
            $scope.licitacion[i].numeroMotor;
            $scope.licitacion[i].color;
            $scope.licitacion[i].estatus;
            query2 += "('" + $scope.licitacion[i].vin + "', '" + $scope.licitacion[i].factura + "' , " + $scope.licitacion[i].idLicitacion + ", '" + $scope.licitacion[i].tipo + "', '" + $scope.licitacion[i].marca + "', '" + $scope.licitacion[i].modelo + "', '" + $scope.licitacion[i].numeroMotor + "', '" + $scope.licitacion[i].color + "', '" + $scope.licitacion[i].estatus + "',0), ";
        }
        query2 = query2.substring(0, query2.length-2);
        console.log(query2);
        busquedaRepository.insertaLicitacion(query2);
        alert('segundos 450');
    };

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alert("Ocurrio un problema, inténtelo más tarde");
    };

});