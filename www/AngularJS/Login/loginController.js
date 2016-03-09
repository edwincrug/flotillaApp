registrationModule.controller("loginController", function ($scope, $rootScope, $state, loginRepository, $cordovaSQLite, perfilRepository, busquedaRepository, $ionicLoading, $ionicPopup) {
    $rootScope.data = [];
    $scope.licitacion = [];

    //Grupo de funciones de inicio
    $scope.init = function () {
        $rootScope.logged = false;
        $rootScope.showTabs = false;
    };

    $scope.iniciarSesion = function (usuario, password) {
        if (usuario == null || usuario == '') {
            alert('El campo usuario es obligatorio, verifique');
        } else if (password == null || password == '') {
            alert('El campo contraseña es obligatorio, verifique');
        } else {
            loginRepository.login(usuario, password)
                .then(function successCallback(response) {
                        $rootScope.data = response.data;
                        $ionicLoading.hide();
                        if ($rootScope.data == null) {
                            $scope.password = '';
                            alert("El nombre de usuario o contraseña son incorrectos, verifique");
                        } else {
                            $rootScope.logged == true;
                            $rootScope.data.usuario = usuario;
                            $rootScope.data.password = password;

                            if ($rootScope.data.idRol == 5 || $rootScope.data.idRol == 6) {
                                alert("Rol no permitido");
                            } else {

                                perfilRepository.insertDatosUsuario($rootScope.data.idUsuario, $rootScope.data.nombreCompleto, usuario, $rootScope.data.idRol, password, $rootScope.data.rol);

                                busquedaRepository.getLicitacion()
                                    .success(getFlotillaSuccessCallback)
                                    .error(errorCallBack);

                                $state.go('tabs.busqueda');
                            }
                        }
                    },
                    function errorCallback(response) {
                        alert("Ocurrio un problema, inténtelo más tarde");
                    });
        }
    }

    $scope.irRegistro = function () {
        location.href = '#/registro';
    };

    $scope.validaCredencialesLocales = function (usuario, password) {
        if (usuario == null || usuario == '') {
            alert('El campo usuario es obligatorio, verifique');
        } else if (password == null || password == '') {
            alert('El campo contraseña es obligatorio, verifique');
        } else {
            $ionicLoading.show({
                template: 'Validando ...'
            });
            var query = "SELECT * FROM DatosUsuario WHERE nombreUsuario = ? AND password = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [usuario, password]).then(function (result) {
                if (result.rows.length > 0) {
                    $ionicLoading.hide();
                    if (result.rows.item(0).idRol == 5 || result.rows.item(0).idRol == 6) {
                        alert("Rol no permitido");
                    } else {
                        $rootScope.logged == true;
                        $rootScope.data.idUsuario = result.rows.item(0).idUsuario;
                        $rootScope.data.nombreCompleto = result.rows.item(0).nombreCompleto;
                        $rootScope.data.usuario = usuario;
                        $rootScope.data.idRol = result.rows.item(0).idRol;
                        $rootScope.data.password = password;
                        $rootScope.data.rol = result.rows.item(0).descripcionRol;
                        
                        $state.go('tabs.busqueda');
                    }

                } else {
                    //alert("Redirige al Web API");
                    $scope.iniciarSesion(usuario, password);
                }
            }, function (error) {
                $ionicLoading.hide();
                alert('Problemas para consultar la BD');
            });
        }

    };

    //Succes obtiene lista de objetos de las flotillas
    var getFlotillaSuccessCallback = function (data, status, headers, config) {
        var query = "INSERT INTO LicitacionUnidad (vin, factura, idLicitacion, tipo, marca, modelo, numeroMotor, color, estatus, usuarioAsignado) VALUES ";
        $scope.licitacion = data;
        for (var i = 0; i <= 450; i++) {
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
        query = query.substring(0, query.length - 2);
        busquedaRepository.insertaLicitacion(query);
        //alert('primeros 450');

        var query2 = "INSERT INTO LicitacionUnidad (vin, factura, idLicitacion, tipo, marca, modelo, numeroMotor, color, estatus, usuarioAsignado) VALUES ";
        $scope.licitacion = data;
        for (var i = 451; i <= 900; i++) {
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
        query2 = query2.substring(0, query2.length - 2);
        console.log(query2);
        busquedaRepository.insertaLicitacion(query2);
        //alert('segundos 450');
    };

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alert("Ocurrio un problema, inténtelo más tarde");
    };

    $scope.registro = function (name, user, pass, confirmPass) {
        var e = document.getElementById('rolSelected');
        var rol = e.options[e.selectedIndex].value;

        if (name == null || name == '') {
            alert("El nombre es un campo obligatorio, verifique");
        } else if (user == null || user == '') {
            alert("El nombre de usuario es un campo obligatorio, verifique");
        } else if (!validaUsuario(user)) {
            alert("El nombre de usuario no tiene el formato esperado, verifique");
        } else if (rol == 0) {
            alert("Elija un rol diferente");
        } else if (pass == null || pass == '') {
            alert("La contraseña es un campo obligatorio, verifique");
        } else if (confirmPass == null || confirmPass == '') {
            alert("La confirmación de contraseña es un campo obligatorio, verifique");
        } else if (pass != confirmPass) {
            alert('Las contraseñas no coinciden, verifique');
        } else {
            loginRepository.add(rol, name, user, pass)
                .then(function successCallback(response) {
                    loginRepository.activate(response.data)
                        .then(function successCallback(response) {
                            alert("Registro Correcto");
                            location.href = '#/login';
                        }, function errorCallback(response) {
                            alert("Registro incorrecto, inténtelo más tarde");
                        });
                }, function errorCallback(response) {
                    alert("Ocurrio un problema, inténtelo más tarde");
                });
        }
    };

    function validaUsuario(user) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(user);
    }

});