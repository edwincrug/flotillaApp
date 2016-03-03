// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Repositorio de métodos para el manejo del Historial de Sincronizaciones
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var documentoUrl = global_settings.urlCORS + '/api/documentoApi/';
var unidadUrl = global_settings.urlCORS + '/api/unidadApi/';
var ruta = global_settings.uploadPath;

registrationModule.factory('historialSincronizacionRepository', function($cordovaSQLite,DBA,$http){
	var self = this;

	self.getHistorialSincronizacion = function(){
		 return DBA.query("SELECT fecha, numDocumentos FROM HistorialSincronizacion")
		 .then(function(result){
		 return DBA.getAll(result);
		 });
	}

	self.insertHistorial = function(document){
	    var parameters = [document.fecha,document.numDocumentos];
	    return DBA.query("INSERT INTO HistorialSincronizacion(fecha,numDocumentos) VALUES(?,?)",parameters)
  	}

	self.getDistinctDocuments = function(){
    return DBA.query("SELECT * FROM UnidadPropiedad")
      .then(function(result){
        return DBA.getAll(result);
      });
  	}

	self.getTotalPerfil = function(){
	    return DBA.query("SELECT * FROM UnidadPropiedad")
	    .then(function(result){
	      return DBA.getAll(result);
	    });
	}

	self.getTotalLocal = function(vin){
	    var parameters = [vin];
	    return DBA.query("SELECT count(*) FROM UnidadPropiedad WHERE vin = (?)", parameters)
	    .then(function(result){
	      return DBA.getAll(result);
	  });
	}

	self.deleteUPLocal = function(unidad){
	    var parameters = [unidad.vin];
	    return DBA.query("DELETE FROM UnidadPropiedad WHERE vin = (?)", parameters)
	}

	self.updateEstatus = function(unidad){
	    var parameters = [unidad.vin];
	    return DBA.query("UPDATE LicitacionUnidad SET estatus = 'Sincronizado' WHERE vin = (?)", parameters)
	}

	self.updateEstatusServer = function(unidad){
		var estatus = 'Sincronizado';
	    return $http({
	      url: unidadUrl,
	      method: "POST",
	      params: { id: '2|' + unidad.vin + '|' + unidad.idLicitacion + '|' + estatus }
		});
	}

	self.saveFile = function(unidad){
	    return $http({
          url: documentoUrl,
          method: "POST",
          params: { id: '1|' + unidad.vin + '|' + unidad.idDocumento + '|' + ruta + unidad.valor }
	    });
    }

    self.updateUnidad = function(unidad){
	    return $http({
	      url: unidadUrl,
	      method: "POST",
	      params: { id: '1|' + unidad.vin + '|' + unidad.idDocumento + '|' + unidad.valor + '|' + unidad.idUsuario}
		});
	}
 	return self;
})