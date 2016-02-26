// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Repositorio del expediente de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.factory('DBA', function($cordovaSQLite, $rootScope,$q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute($rootScope.FlotillasDB, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    //output = angular.copy(result.rows.item(0));
    output = result.rows.length;
    return output;
  }

  return self;
})

registrationModule.factory('expedienteRepository', function($cordovaSQLite, DBA) {
  var self = this;

  self.addDocument = function(document){
    var parameters = [document.vin, document.factura, document.idDocumento, document.valor, document.estatus];
    return DBA.query("INSERT INTO UnidadPropiedad(vin, factura, idDocumento, valor, estatus) VALUES(?,?,?,?,?)",parameters)
  }

  self.updateDocument = function(document) {
    var parameters = [document.valor,document.vin, document.idDocumento];
    return DBA.query("UPDATE UnidadPropiedad SET valor = (?) WHERE vin = (?) AND idDocumento = (?)", parameters);
  }

  self.getDocuments = function(vin) {
    var parameters = [vin];
    return DBA.query("SELECT * FROM UnidadPropiedad WHERE vin= (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.getDocument = function(vin, idDocumento) {
    var parameters = [vin, idDocumento];
    return DBA.query("SELECT * FROM UnidadPropiedad WHERE vin= (?) AND idDocumento= (?)", parameters)
      .then(function(result){
        return DBA.getById(result);
      });
  }

  return self;
})