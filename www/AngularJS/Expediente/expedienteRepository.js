// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 08/02/2016
// -- Description: Repositorio del expediente de aplicación móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var docUrl = global_settings.urlCORS + '/api/unidadapi/';
registrationModule.factory('expedienteRepository', function($http, $cordovaSQLite,DBA) {
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

  self.existsDocument = function(vin, idDocumento) {
    var parameters = [vin, idDocumento];
    return DBA.query("SELECT COUNT(*)NumRows FROM UnidadPropiedad WHERE vin= (?) AND idDocumento= (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.getServerRolDocuments = function(){
      return $http({
          url: docUrl,
          method: "GET",
          params: {
              id: '5'
          }
      });
  }

  self.existsRolDocuments = function(){
    return DBA.query("SELECT COUNT(*)NumRows FROM RolDocumento", [])
      .then(function(result){
        return DBA.getAll(result);
      },function(err){
        alert('error :(');
      });
  }

  self.insertRolDocuments = function(document){
    var parameters = [document.idRol, document.orden, document.idDocumento, document.tituloDoc, document.valor, document.tipo, document.estatus];
    return DBA.query("INSERT INTO RolDocumento(idRol, orden, idDocumento, tituloDoc, valor, tipo, estatus) VALUES(?,?,?,?,?,?,?)",parameters)
  }

  self.getLocalRolDocuments = function(vin,idRol){
    var parameters = [vin,idRol];
    return DBA.query("SELECT rd.idRol, rd.orden, rd.idDocumento, rd.tituloDoc, IFNULL(up.valor, rd.valor)valor, rd.tipo, IFNULL(up.estatus,rd.estatus)estatus FROM RolDocumento rd LEFT JOIN UnidadPropiedad up ON rd.idDocumento = up.idDocumento AND up.vin= (?) WHERE rd.idRol= (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      },function(err){
        alert('error :(');
      });
  }

  self.imageUpload = function (imgUrl,idDocumento) {
     // Destination URL 
     var url = "http://192.168.20.9/myPhp/hola.php";

     var filename = $rootScope.expVin+'-'+idDocumento+'.jpg';//imgUrl.split("/").pop();
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'directory':'upload', 'fileName':filename}
      };
           
      $cordovaFileTransfer.upload(url, imgUrl, options).then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
  }

  //Elimina un archivo con ruta específica
  self.deleteImageURL = function(imgURL){
    window.resolveLocalFileSystemURL(imgURL, function (fileEntry) {
      fileEntry.remove();
    }, function (error) {
      alert("Error al eliminar el archivo.");
    });
  }

  return self;
})