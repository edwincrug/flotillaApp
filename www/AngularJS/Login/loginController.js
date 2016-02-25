registrationModule.controller("loginController", function ($scope, $rootScope, $state, loginRepository, $cordovaSQLite, perfilRepository) {
    $rootScope.data = [];
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
                    
                    alert('Login desde WebApi');
                    location.href = '#/tab/busqueda';

                    /*$cordovaFile.createFile(cordova.file.dataDirectory, "flotillasCredentials.txt", false)
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
                    $rootScope.ingresa = true;*/
                }
                //alertFactory.success('Datos de flotillas cargados.');
            }, function errorCallback(response) {
                alert("Ocurrio un problema, inténtelo más tarde");
                //alertFactory.info('No se encuentran datos con los criterios de búsqueda');
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

                    location.href = '#/tab/busqueda';
                } else {
                    alert("El nombre de usuario o contraseña son incorrectos, verifique");
                }
            }, function (error) {
                alert('Problemas para consultar la BD');
            });
        }

    };
});