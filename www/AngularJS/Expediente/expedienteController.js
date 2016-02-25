// -- Author:      Mario Mejía
// -- Create date: 08/02/2016
// -- Description: Controlador del expediente de aplicación Móvil Flotillas
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller("expedienteController", function($scope, $ionicPopup, $ionicModal, $rootScope,$cordovaCamera,expedienteRepository){

    //Propiedades
    $scope.imgURI= null;
    //Grupo de funciones de inicio
    $scope.init = function () {
        $scope.cargaImagen();
        
    }

    $scope.cargaImagen = function(){
        //for(var i = 0; )
        if($rootScope.countDocs > 0){
            $scope.imgURI = $rootScope.expediente[0].valor;
        }
        else{
            $scope.imgURI = 'images/auto_delantera.jpg';
        }
    }

    $scope.tomarFoto = function(idDocumento){
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
            $scope.imgURI = imageData;
            $rootScope.facturaVin
            expedienteRepository.insertDocumento('AA000013433','324234', idDocumento, $scope.imgURI, 'Pendiente');
        }, function(err) {
            console.log('Ocurrió un problema al tomar la foto.')
        });
    }

    $scope.data2 = [
        { id: 1, title: 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7', VIN: '1FBAX2CM0FKA56032' , factura: 'AA000013433'}
    ]; 

    $scope.settings = { 
        lang: 'es'
    }

    $scope.Alerta = function (){
        alert("Entra");
    }

          $scope.data = [
        {
            id: 1,
            name: 'Vin: 1FBAX2CM0FKA56032',
            factura: 'AA000013433',
            estatus: 'Cargado',
            descripcion : 'CAMIONETA FORD TRANSIT 350 WAGON GASOLINA A/A Motor 3.7',
            estatusFrente: 'Cargado',
            imageFrente: 'images/auto_delantera.png',
            estatusDerecha:'Sin Documento',
            imageDerecha: 'images/auto_derecha.jpg',
            estatusTrasera: 'Pendiente',
            imageTrasera: 'images/auto_trasera.jpg',
            estatusIzquierda: 'Cargado',
            imageIzquierda:'images/auto_izquierda.jpg'

        }
    ];

    /*$scope.settings = {
        theme: 'mobiscroll',
        enhance: true
    };*/
    $scope.settingsMenu = {
        theme: 'mobiscroll',
        display: 'top',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };

    // pop up para ver o tomar foto
    $scope.obtenerFoto = function(idDocumento) {
      $scope.data = {};
      if($scope.imgURI == 'images/auto_delantera.jpg'){
        $scope.tomarFoto(idDocumento);
      }
      else{
        // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            //template: '<input type="password" ng-model="data.wifi">',
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
                  $scope.showImage(2);
                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });

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

    $scope.showImage = function(index) {
      switch(index) {
        case 1:
          $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
          break;
        case 2:
          $scope.imageSrc  = $scope.imgURI;
          break;
        case 3:
          $scope.imageSrc  = 'images/auto_trasera.jpg';
          break;
      }
      $scope.openModal();
    }
});