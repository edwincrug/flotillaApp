var loginUrl = global_settings.urlCORS + '/api/usuarioapi/';
var searchUrl = global_settings.urlCORS + '/api/flotillaApi/';

registrationModule.factory('loginRepository', function ($http, $rootScope, $cordovaSQLite) {
    return {
        add: function (rol, nombre, email, password) {
            // return $http.post(loginUrl + '1|' + rol + '|' + nombre + '|' + email + '|' + password);
            return $http({
                url: loginUrl,
                method: "POST",
                params: {
                    id: '1|' + rol + '|' + nombre + '|' + email + '|' + password
                }
            });
        },

        login: function (usuario, password) {
            // return $http.put(loginUrl + '1|' + usuario + '|' + password);
            return $http({
                url: loginUrl,
                method: "POST",
                params: {
                    id: '3|' + usuario + '|' + password
                }
            });
        },
        loginLocal: function (usuario, password) {
            var credencialesOK = false;
            var query = "SELECT nombreUsuario, password FROM DatosUsuario WHERE nombreUsuario = ? AND password = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [usuario, password]).then(function (result) {
                if (result.rows.length > 0) {
                    credencialesOK = true;
                } else {
                    credencialesOK = false;
                }
            }, function (error) {
                alert('Problemas para consultar la BD');
            });
            return credencialesOK;
        },
        getTotalRegistros: function () {            
            var query = "SELECT Count(nombreUsuario) AS count FROM DatosUsuario ";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query).then(function (result) {
                if (result.rows.item(0).count > 0) {
                    $rootScope.totalRegistros = result.rows.item(0).count;
                }
                else{
                    $rootScope.totalRegistros = 0;
                }
            }, function (error) {
                alert('Problemas para consultar la BD');
            });
            return $rootScope.totalRegistros;
        }
    };
});