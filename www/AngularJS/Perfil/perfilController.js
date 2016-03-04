registrationModule.controller("perfilController", function ($scope, $rootScope, perfilRepository, $ionicHistory) {

    $scope.Inicializar = function () {

    }


    $scope.init = function () {
        //alert('Setea Valores');
        $scope.nombreCompleto = $rootScope.data.nombreCompleto;
        $scope.nombreUsuario = $rootScope.data.usuario;
        $scope.rol = $rootScope.data.rol;
        $scope.contrasena = $rootScope.data.password;

        $scope.nuevoNombre = $rootScope.data.nombreCompleto;
        $scope.nuevoUsuario = $rootScope.data.usuario;
        $scope.oldPass = $rootScope.data.password;

        $scope.tablaRoles = perfilRepository.getTablaRoles();

    }

    $scope.descriptionRol = function (idRol) {
        perfilRepository.getDescriptionRol(idRol).then(function (description) {
            $scope.rol = description;
        });
    }

    $scope.GetSelectedRol = function () {
        var e = document.getElementById('sRol');
        $scope.selectedIdRol = e.options[e.selectedIndex].value;
        $scope.selectedRol = e.options[e.selectedIndex].text;
    }

    $scope.insertaNombre = function (nombre) {
        perfilRepository.insertNombreCompleto(nombre);
        location.href = '#/tab/perfil';
    }

    $scope.insertaUsuario = function (usuario) {
        perfilRepository.insertUsuario(usuario);
        $ionicHistory.goBack();
    };

    $scope.insertaRol = function () {
        var e = document.getElementById('sRol');
        $scope.selectedIdRol = e.options[e.selectedIndex].value;
        $scope.selectedRol = e.options[e.selectedIndex].text;
        perfilRepository.insertRol($scope.selectedIdRol);
        $scope.perfil.rol = e.options[e.selectedIndex].text;
        location.href = '#/tab/perfil';
    }

    $scope.insertaPass = function (oldPass, newPass, confirmPass) {
        if (oldPass == null || newPass == null || confirmPass == null) {
            alert('Ninguno de los campos puede estar vacío, verifique');
        } else {
            if (oldPass != $rootScope.data.password) {
                alert('La contraseña actual no coincide con la registrada en el sistema, verifique');
            } else {
                if (newPass != confirmPass) {
                    alert('Las contraseñas no coinciden, verifique');
                } else {
                    perfilRepository.insertPass(newPass, $rootScope.data.idUsuario);
                    $ionicHistory.goBack();
                }
            }
        }
    }

    $scope.logout = function () {
        $rootScope.showTabs = false;
        location.href = '#/login';
        navigator.app.exitApp();
    }

    $scope.Modificar = function (nuevoNombre, nuevoUsuario, oldPass, nuevoPass, confirmNuevoPass) {
        var e = document.getElementById('sRol');
        var rol = e.options[e.selectedIndex].value;
        var nombreRol = e.options[e.selectedIndex].text;

        if (nuevoNombre == null || nuevoNombre == '') {
            alert("El nombre es un campo obligatorio, verifique");
        } else if (nuevoUsuario == null || nuevoUsuario == '') {
            alert("El nombre de usuario es un campo obligatorio, verifique");
        } else if (!validaUsuario(nuevoUsuario)) {
            alert("El nombre de usuario no tiene el formato esperado, verifique");
        } else if (oldPass == null || oldPass == '') {
            alert("El campo contraseña actual es un campo obligatorio, verifique");
        } else if (oldPass != $rootScope.data.password) {
            alert("La contraseña actual no corresponde a la registrada dentro del sistema, verifique");
        } else if (nuevoPass == null || nuevoPass == '') {
            alert("La contraseña es un campo obligatorio, verifique");
        } else if (confirmNuevoPass == null || confirmNuevoPass == '') {
            alert("La confirmación de contraseña es un campo obligatorio, verifique");
        } else if (nuevoPass != confirmNuevoPass) {
            alert('Las contraseñas no coinciden, verifique');
        } else {
            perfilRepository.updateDatosUsuario($rootScope.data.idUsuario, nuevoNombre, nuevoUsuario, rol, nuevoPass, nombreRol)
                .then(function successCallback(response) {

                    /*$rootScope.data.nombreCompleto = nuevoNombre;
                    $rootScope.data.usuario = nuevoUsuario;
                    $rootScope.data.rol = nombreRol;
                    $rootScope.data.password = nuevoPass;*/


                    alert('Datos actualizados correctamente');
                }, function errorCallback(response) {
                    alert("Ocurrio un problema, inténtelo más tarde");
                });
        }
    }

    function validaUsuario(user) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(user);
    }
});