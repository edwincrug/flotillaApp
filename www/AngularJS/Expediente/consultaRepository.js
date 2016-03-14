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
});