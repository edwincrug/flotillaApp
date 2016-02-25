registrationModule.controller("perfilController", function ($scope, $rootScope, perfilRepository, $ionicHistory) {

    $scope.init = function () {
        $rootScope.data.rol = perfilRepository.getRol($rootScope.data.idRol);
        $scope.perfil = [
            {

                id: 1,
                nombre: $rootScope.data.nombreCompleto,
                rol: $rootScope.data.rol,
                usuario: $rootScope.data.usuario,
                contrasena: $rootScope.data.password,
        }
    ];
        $scope.tablaRoles = perfilRepository.getTablaRoles();
        //$scope.tablaRoles = $rootScope.tablaRoles;
        //$scope.SimpleSelectedData = $rootScope.data.rol;
    };

    $scope.GetSelectedRol = function () {
        var e = document.getElementById('sRol');
        $scope.selectedIdRol = e.options[e.selectedIndex].value;
        $scope.selectedRol = e.options[e.selectedIndex].text;
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
    }

    $scope.settings = {
        lang: 'es',
        enhance: false,
    }

    $scope.insertaNombre = function (nombre) {
        perfilRepository.insertNombreCompleto(nombre);
        location.href = '#/tab/perfil';
    };

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
    };

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
    };
});