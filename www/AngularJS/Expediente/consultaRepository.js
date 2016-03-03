registrationModule.factory('consultaRepository', function ($rootScope, $cordovaSQLite, DBA) {
    var self = this;
    var tablaRoles = [];
    var descripcionRol = '';

    self.getExpedientes = function (idUsuario) {
        var parameters = [idUsuario];
        return DBA.query("SELECT * FROM LicitacionUnidad WHERE usuarioAsignado = ?", parameters)
            .then(function (result) {
                return DBA.getAll(result);
            });
    }
    return self;

    /*  var expedientes = [];
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
      }*/
});