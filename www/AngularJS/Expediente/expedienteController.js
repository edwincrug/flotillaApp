// -- Author:      Vicente Vladimir Juárez Juárez
// -- Create date: 08/02/2016
// -- Description: Controlador del expediente de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("expedienteController", function($scope, $ionicPopup, $ionicModal, $rootScope,$cordovaCamera, expedienteRepository){

    //Propiedades
    $scope.document = [];
    $scope.document = null;

    //Grupo de funciones de inicio
    $scope.init = function () {
        $scope.imgFotoFrente = 'images/auto_delantera.jpg';
        $scope.imgFotoTrasera = 'images/auto_trasera.jpg';
        $scope.imgFotoDerecha = 'images/auto_derecha.jpg';
        $scope.imgFotoIzquierda = 'images/auto_izquierda.jpg';
        $scope.imgFotoPlaca = 'images/placa.jpg';
        $scope.imgFotoAcuseRec = 'images/acuse_recibo.jpg';
        $scope.imgFotoAcuseEnt = 'images/acuse_entrega.jpg';
        $scope.txtNumPlaca = '';
        $scope.txtRecibidoPor = '';
        $scope.refreshDocuments("AA000013433");
    }

    $scope.cargaImagen = function(document){
        for(var i = 0; i < document.length; i++){
            if(document[i].idDocumento == 27){
                $scope.imgFotoFrente= document[i].valor;
            }
            else if(document[i].idDocumento == 28){
                $scope.imgFotoTrasera= document[i].valor;
            }
            else if(document[i].idDocumento == 29){
                $scope.imgFotoIzquierda= document[i].valor;
            }
            else if(document[i].idDocumento == 30){
                $scope.imgFotoDerecha= document[i].valor;
            }
            else if(document[i].idDocumento == 13){
                $scope.imgFotoPlaca= document[i].valor;
            }
            else if(document[i].idDocumento == 17){
                $scope.imgFotoAcuseRec= document[i].valor;
            }
            else if(document[i].idDocumento == 18){
                $scope.imgFotoAcuseEnt= document[i].valor;
            }
            else if(document[i].idDocumento == 39){
                $scope.txtNumPlaca= document[i].valor;
            }
            else if(document[i].idDocumento == 26){
                $scope.txtRecibidoPor= document[i].valor;
            }
        }
    }

    $scope.refreshDocuments = function(vin) {
        expedienteRepository.getDocuments(vin).then(function(document){
          $scope.document = document;
          if($scope.document.length > 0){
            alert('Num. documents: '+$scope.document.length+' '+$scope.document[0].vin+' '+$scope.document[0].valor);
            $scope.cargaImagen($scope.document);
          }
        });
    }

    $scope.addDocument = function(document){
        expedienteRepository.addDocument(document);
        $scope.refreshDocuments(document.vin);
        
    }

    $scope.updateDocument = function(document){
      expedienteRepository.updateDocument(document);
      $scope.refreshDocuments(document.vin);
    }

    $scope.getOneDocument = function(document){
      expedienteRepository.getDocument(document.vin, document.idDocumento).then(function(documentRes){
          var existsDocument = documentRes;
          if(existsDocument > 0){
              $scope.updateDocument(document);
          }
          else{
              $scope.addDocument(document);
          }
      });
    }
    
    $scope.tomarFoto = function(idDocumentoo){
        var options = { 
            //quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            //allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 120,
            targetHeight: 120,
            //popoverOptions: CameraPopoverOptions,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
          var documentObj = {vin:"AA000013433", factura:"324234", idDocumento:idDocumentoo, valor:imageData, estatus:"Pendiente"};
          $scope.getOneDocument(documentObj);
        }, function(err) {
            console.log('Ocurrió un problema al tomar la foto.')
        });
    }

    // pop up para ver o tomar foto
    $scope.altaDocumento = function(idDocumento, valDocumento) {
        if(idDocumento !== 39 && idDocumento !== 26){
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
                      $scope.showImage(2, valDocumento);
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
            var documentObj = {vin:"AA000013433", factura:"324234", idDocumento:idDocumento, valor:valDocumento, estatus:"Pendiente"};
            $scope.getOneDocument(documentObj);
        }
      
      /*$timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);*/

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

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.showImage = function(index, valDocumento) {
      switch(index) {
        case 1:
          //$scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
          break;
        case 2:
          $scope.imageSrc  = valDocumento;
        case 3:
          //$scope.imageSrc  = 'images/auto_trasera.jpg';
          break;
      }
      $scope.openModal();
    }
});