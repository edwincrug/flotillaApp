// -- Author:      Vicente Vladimir Juárez Juárez
// -- Create date: 08/02/2016
// -- Description: Controlador del expediente de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("expedienteController",function($scope,$rootScope,$ionicPopup, $ionicModal,$cordovaCamera,expedienteRepository){

    //Propiedades
    $scope.document = [];
    $scope.document = null;
    $scope.images = {};

    //Grupo de funciones de inicio
    $scope.init = function (){
        $scope.getLocalRolDocuments();
    }

    $scope.clickExp = function(){
        alert('tab expediente');
    }

    $scope.getLocalRolDocuments = function(){
        alert($rootScope.vin);
        expedienteRepository.getLocalRolDocuments($rootScope.vin,$rootScope.data.idRol).then(function(response){
            $scope.localDocuments = response;
            /*if($scope.localDocuments.length > 0 ){
                alert("yea! I brought data"+"  "+$scope.localDocuments.length);
            }
            else{
                alert("I couldn't bring data");
            }*/
        },function(error){
           alert(error);     
        });
     };

    $scope.addDocument = function(document){
        expedienteRepository.addDocument(document);
        $scope.getLocalRolDocuments();
    }

    $scope.updateDocument = function(document){
      expedienteRepository.updateDocument(document);
      $scope.getLocalRolDocuments();
    }

    $scope.getOneDocument = function(document){
      expedienteRepository.existsDocument(document.vin, document.idDocumento).then(function(documentRes){
          if(documentRes[0].NumRows > 0){
              $scope.updateDocument(document);
          }
          else{
              $scope.addDocument(document);
          }
      });
    }

    $scope.tomarFoto = function(idDocumentoo){
        var options = { 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
          var documentObj = {vin:$rootScope.vin, factura:$rootScope.factura, idDocumento:idDocumentoo, valor:imageData, estatus:"Pendiente"};
          $scope.getOneDocument(documentObj);
        }, function(err) {
            console.log('Ocurrió un problema al tomar la foto.')
        });
    }

    // pop up para ver o tomar foto
    $scope.altaDocumento = function(idDocumento, valDocumento, tipo) {
        if(tipo === 'img'){
          var image = valDocumento.substring(0, 6);
          if(image == 'images'){
            $scope.tomarFoto(idDocumento);
          }
          else{
             // An elaborate, custom popup
              var myPopup = $ionicPopup.show({
                title: 'Foto',
                subTitle: 'Elige una acción',
                scope: $scope,
                buttons: [
                  {
                    text: '<b>Tomar foto</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                       $scope.tomarFoto(idDocumento);
                    }
                  },
                  {
                    text: '<b>Ver foto</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      $scope.showImage(valDocumento);
                    }
                  }
                ]
              });

              myPopup.then(function(res) {
                console.log('Tapped!', res);
              });
          }
        }
        else if(valDocumento !== ''){
            var documentObj = {vin:$rootScope.vin, factura:$rootScope.factura, idDocumento:idDocumento, valor:valDocumento, estatus:"Pendiente"};
            $scope.getOneDocument(documentObj);
        }
     };

     //visualiza la imagen seleccionada
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.showImage = function(valDocumento) {
      $scope.imageSrc  = valDocumento;
      $scope.openModal();
    }

    //Elimina un archivo con ruta específica
    $scope.deleteFile = function(){
        //alert($scope.document[0].valor);
         window.resolveLocalFileSystemURL($scope.document[0].valor, function(fileEntry){
            //alert(fileEntry.name);
            fileEntry.remove();
         }, function(error){
            alert(error);
         });
    };

    $scope.takeIdDoc = function(idDocumento){
        $scope.idDoc = idDocumento;
    }
    
    var minDate = new Date();
    var maxDate = new Date(minDate.getFullYear() + 1, minDate.getMonth(), minDate.getDate());
    $scope.depOptions = {
      format: 'dd/mm/yyyy',
      min: minDate,
      max: maxDate,
      onClose: function(e){
        console.log($scope.valor);
        $scope.altaDocumento($scope.idDoc, $scope.valor, 'dat');
      }
    }
})