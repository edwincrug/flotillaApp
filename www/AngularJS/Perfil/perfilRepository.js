registrationModule.factory('perfilRepository', function ($rootScope, $cordovaSQLite) {
    var tablaRoles = [];
    var descripcionRol = '';
    return {
        getTablaRoles: function () {
            var query = "SELECT idRol, descripcion FROM Rol";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, []).then(function (result) {
                //alert('En el select');
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        tablaRoles.push(result.rows.item(i));
                    }
                } else {
                    alert("NO ROWS EXISTS");
                }
            }, function (error) {
                console.log(error);
            });
            return tablaRoles;
        },
        insertNombreCompleto: function (nombre) {
            var query = "INSERT INTO DatosUsuario (nombreCompleto) VALUES(?)";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [nombre]).then(function (result) {
                $rootScope.data.nombreCompleto = nombre;
            }, function (error) {
                alert('NO se inserto el nombre completo');
            });
        },
        insertUsuario: function (usuario) {
            var query = "INSERT INTO DatosUsuario (nombreUsuario) VALUES(?)";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [usuario]).then(function (result) {
                $rootScope.data.usuario = usuario;
            }, function (error) {
                alert('NO se inserto el nombre completo');
            });
        },
        insertRol: function (idRol) {
            var query = "INSERT INTO DatosUsuario (idRol) VALUES(?)";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [idRol]).then(function (result) {
                alert('Rol Actualizado');
            }, function (error) {
                alert('NO se inserto el nombre completo');
            });
        },
        insertPass: function (pass, idUsuario) {
            var query = "UPDATE DatosUsuario SET password = ? WHERE idUsuario = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [pass, idUsuario]).then(function (result) {
                alert('Contraseña Actualizada');
            }, function (error) {
                alert('NO se inserto el nombre completo');
            });
        },
        insertDatosUsuario: function (idUsuario, nombreCompleto, nombreUsuario, idRol, password) {
            var query = "INSERT INTO DatosUsuario (idUsuario, nombreCompleto, nombreUsuario, idRol, password, huboCambio) VALUES(?,?,?,?,?,?)";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [idUsuario, nombreCompleto, nombreUsuario, idRol, password, 0]).then(function (result) {
                alert('Datos usuario almacenados: ' + result.insertId);
            }, function (error) {
                alert('NO se insertaron datos del usuario');
            });
        },
        getRol: function (idRol) {
            var query = "SELECT descripcion FROM Rol WHERE idRol = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [idRol]).then(function (result) {
                //alert('En el select');
                if (result.rows.length > 0) {
                    descripcionRol = result.rows.item(0).descripcion;
                } else {
                    alert("NO ROWS EXISTS");
                }
            }, function (error) {
                console.log(error);
            });
            return descripcionRol;
        }
    }
});