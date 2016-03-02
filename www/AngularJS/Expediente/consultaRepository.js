registrationModule.factory('consultaRepository', function ($rootScope, $cordovaSQLite) {
    var expedientes = [];
    return {
        getExpedientes: function (idUsuario) {
            var query = "SELECT * FROM LicitacionUnidad WHERE usuarioAsignado = ?";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, [idUsuario]).then(function (result) {
                //alert('En el select');
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        expedientes.push(result.rows.item(i));
                    }
                } else {
                    //alert("NO ROWS EXISTS");
                }
            }, function (error) {
                console.log(error);
            });
            return expedientes;
        }
    }
});