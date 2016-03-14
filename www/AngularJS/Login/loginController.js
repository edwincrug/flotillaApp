registrationModule.controller("loginController", function ($scope, $rootScope, $state, loginRepository, $cordovaSQLite, perfilRepository, busquedaRepository, DBA,$ionicLoading) {
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
        $ionicLoading.hide();
        if ($rootScope.data == null) {
            $scope.password = '';
            alert("El nombre de usuario o contraseña son incorrectos, verifique");
        } else {
            $rootScope.data.usuario = usuario;
            $rootScope.data.password = password;

            if ($rootScope.data.idRol == 5 || $rootScope.data.idRol == 6) {
                alert("Rol no permitido");
            } else {
                perfilRepository.insertDatosUsuario($rootScope.data.idUsuario, $rootScope.data.nombreCompleto, usuario, $rootScope.data.idRol, password, $rootScope.data.rol);
                $state.go('tabs.busqueda');
}
}
},
function errorCallback(response) {
    alert("Ocurrio un problema, inténtelo más tarde");
});
};

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
            getServerLicitaciones();
            if (result.rows.length > 0) {
                $ionicLoading.hide();
                if (result.rows.item(0).idRol == 5 || result.rows.item(0).idRol == 6) {
                    alert("Rol no permitido");
                } else {
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
    alert('Problemas para consultar la BD');
});
    }

};

var getServerLicitaciones = function(){
    busquedaRepository.existsLicitaciones().then(function(numLicitaciones){
        if(numLicitaciones[0].NumRows > 0){
            alert("ya existen registros [LicitacionUnidad]");
        }
        else{
            busquedaRepository.getServerLicitaciones().then(function(licitacion){
                var listLicitaciones = licitacion.data;
                if(listLicitaciones.length > 0){
                    for (var i=0; i < listLicitaciones.length; i++) {
                        var licitacionUnidad = {vin:listLicitaciones[i].vin,
                            factura:listLicitaciones[i].factura,
                            idLicitacion:listLicitaciones[i].idLicitacion,
                            tipo:listLicitaciones[i].tipo,
                            marca:listLicitaciones[i].marca,
                            modelo:listLicitaciones[i].modelo,
                            estatus:listLicitaciones[i].estatus};
                            busquedaRepository.insertaLicitacion(licitacionUnidad).then(function(licitacionResult){

                            }, function(error){
                                alert("Error al insertar en [LicitacionUnidad]");
                            })
                        }
                    }
                },function(error){
                    alert("Error al obtener licitaciones del servidor. :(");
                })
        }
    },function(error){
        alert("Error al obtener registros en [LicitacionUnidad]");
    });
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