// -- =============================================
// -- Author:      Mario A. Mejía Ramírez
// -- Create date: 08/02/2016
// -- Description: Repositorio de la busqueda de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.factory('busquedaRepository', function($http, $rootScope,$cordovaSQLite,DBA) {
  var self = this;

    self.getUnidadFactura = function(facturaVin){
      var parameters = [facturaVin, facturaVin];
      return DBA.query("SELECT * FROM LicitacionUnidad WHERE vin=(?) OR factura= (?)", parameters)
        .then(function(result){
          return DBA.getAll(result);
        });
    }

    self.getServerLicitaciones = function () {
        return $http({
            url: searchUrl,
            method: "GET",
            params: {
                id: '2|'
            }
        });
    }

    self.insertaLicitacion = function (licitacion) {   
        var parameters = [licitacion.vin, licitacion.factura, licitacion.idLicitacion, licitacion.tipo, licitacion.marca, licitacion.modelo,licitacion.estatus,licitacion.usuarioAsignado];
    return DBA.query("INSERT INTO LicitacionUnidad(vin, factura, idLicitacion, tipo, marca, modelo, estatus, usuarioAsignado) VALUES(?,?,?,?,?,?,?,?)",parameters)
    }

     self.existsLicitaciones = function(){
        return DBA.query("SELECT COUNT(*)NumRows FROM LicitacionUnidad", [])
          .then(function(result){
            return DBA.getAll(result);
          },function(err){
            alert('error :(');
          });
    }

    self.updateLicitacionUnidad = function(usuarioAsignado, vin) {
        var parameters = [usuarioAsignado,vin];
        return DBA.query("UPDATE LicitacionUnidad SET usuarioAsignado = (?) WHERE vin = (?)", parameters);
    }

    self.validateLicitacionAssignment = function(usuarioAsignado, vin){
        var parameters = [usuarioAsignado, vin];
        return DBA.query("SELECT COUNT(*)NumRows FROM LicitacionUnidad WHERE usuarioAsignado= (?) AND vin = (?)", parameters)
          .then(function(result){
            return DBA.getAll(result);
          });
    }

    return self;
})