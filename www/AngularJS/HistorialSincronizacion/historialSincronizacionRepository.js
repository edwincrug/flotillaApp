// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Repositorio de métodos para el manejo del Historial de Sincronizaciones
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var documentoUrl = global_settings.urlCORS + '/api/documentoApi/';
var unidadUrl = global_settings.urlCORS + '/api/unidadApi/';

registrationModule.factory('historialSincronizacionRepository', function($cordovaSQLite, $cordovaFile,DBA,$http,$cordovaFileTransfer,networkRepository,$rootScope){
 var self = this;

 self.getHistorialSincronizacion = function(){
   return DBA.query("SELECT fecha, numDocumentos FROM HistorialSincronizacion")
   .then(function(result){
   return DBA.getAll(result);
   });
 }

 self.insertHistorial = function(fecha, numDoc){
   var parameters = [fecha,numDoc];
   return DBA.query("INSERT INTO HistorialSincronizacion(fecha,numDocumentos) VALUES(?,?)",parameters)
 }

 self.getDistinctDocuments = function(){
  return DBA.query("SELECT DISTINCT vin FROM UnidadPropiedad")
    .then(function(result){
      return DBA.getAll(result);
    });
 }

 self.countDocuments = function(idRol, vin){
  var parameters = [idRol, vin];
      return DBA.query("SELECT (SELECT COUNT(*) FROM RolDocumento WHERE idRol = (?)) AS totalRol,(SELECT COUNT(*) FROM UnidadPropiedad WHERE vin = (?)) AS totalUnidad", parameters)
      .then(function(result){
        return DBA.getAll(result);
    });
 } 

 self.deleteUPLocal = function(vin){
     var parameters = [vin];
     return DBA.query("DELETE FROM UnidadPropiedad WHERE vin = (?)", parameters)
 }

 self.updateEstatus = function(vin){
     var parameters = [vin];
     return DBA.query("UPDATE LicitacionUnidad SET estatus = 'Sincronizado' WHERE vin = (?)", parameters)
 }

 self.updateEstatusServer = function(vin, idLicitacion){
  var estatus = 'Sincronizado';
     return $http({
       url: unidadUrl,
       method: "POST",
       params: { id: '2|' + vin + '|' + idLicitacion + '|' + estatus }
  });
 }

self.updateUnidad = function(vin,idDocumento,valor,idUsuario){
 return $http({
   url: unidadUrl,
   method: "POST",
   params: { id: '1|' + vin + '|' + idDocumento + '|' + valor + '|' + idUsuario}
  });
 }

 self.obtenerDatos = function(vin){
  var parameters = [vin];
  return DBA.query("SELECT * FROM UnidadPropiedad WHERE vin = (?)", parameters)
  .then(function(result){
      return DBA.getAll(result);
  }); 
 }

 self.obtenerLicitacion = function(vin){
  var parameters = [vin];
  return DBA.query("SELECT idLicitacion FROM LicitacionUnidad WHERE vin = (?)", parameters)
    .then(function(result){
        return DBA.getAll(result);
    });
 }

 self.testFileUpload = function (vin,imgUrl,idDocumento) {
  var url = imgUrl.substring(imgUrl.length, imgUrl.length -4);
    if(url == '.jpg'){
      // Destination URL 
       var url = "http://192.168.20.9/myPhp/hola.php";

       var filename = vin+'-'+idDocumento+'.jpg';
       var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params : {'directory':'upload', 'fileName':filename}
        };
        
        //alert(imgUrl);

        $cordovaFileTransfer.upload(url, imgUrl, options).then(function (result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function (err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // PROGRESS HANDLING GOES HERE
        });
    }
  }

  self.deleteImageURL = function(imgURL){
    var url = imgURL.substring(imgURL.length, imgURL.length -4);
    if(url == '.jpg'){
      imgURL = imgURL.split('/').pop();
      alert(cordova.file.externalCacheDirectory+imgURL);
      $cordovaFile.removeFile(cordova.file.externalCacheDirectory, imgURL);
      /*window.resolveLocalFileSystemURL(imgURL, function (fileEntry) {
          fileEntry.remove();
      }, function (error) {
          alert("Error al eliminar el archivo.");
      });*/
    }    
  }

  self.deleteImage = function(arrayImg){
    for (var i = 0; i < arrayImg.length; i++) {
      self.deleteImageURL(arrayImg[i]);
    }
  }
  return self;
})