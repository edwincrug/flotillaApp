// -- Author: Vicente Vladimir Juárez Juárez
// -- Create date: 08/02/2016
// -- Description: Controlador del expediente de aplicación Móvil Flotillas
// -- Modificó:
// -- Fecha:
// -- =============================================
registrationModule.controller("expedienteController", function ($scope, $rootScope, $ionicPopup, $ionicModal, $cordovaCamera, $cordovaFileTransfer,expedienteRepository, $cordovaDatePicker) {

//Grupo de funciones de inicio
$scope.init = function () {
    $scope.getLocalRolDocuments();
}

$scope.getLocalRolDocuments = function () {
    //alert($rootScope.expVin +" "+$rootScope.expFactura);
    expedienteRepository.getLocalRolDocuments($rootScope.expVin, $rootScope.data.idRol).then(function (response) {
        $scope.localDocuments = response;

        for (var i = 0; i < $scope.localDocuments.length; i++) {
            if ($scope.localDocuments[i].idDocumento == 25) {
                $scope.fechaEntregaUni = {
                    value: new Date($scope.localDocuments[25].valor)
                };
                $scope.localDocuments[25].valor = $scope.fechaEntregaUni.value;
            }
        }
    }, function (error) {
        alert(error);
    });
};

$scope.addDocument = function (document) {
    expedienteRepository.addDocument(document);
    $scope.getLocalRolDocuments();
}

$scope.updateDocument = function (document) {
    expedienteRepository.updateDocument(document);
    $scope.getLocalRolDocuments();
}

$scope.getOneDocument = function (document) {
    expedienteRepository.existsDocument(document.vin, document.idDocumento).then(function (documentRes) {
        if (documentRes[0].NumRows > 0) {
            $scope.updateDocument(document);
            expedienteRepository.deleteImageURL(documentRes[0].valor);
        } else {
            $scope.addDocument(document);
        }
    });
}

$scope.tomarFoto = function (idDocumentoo) {
//screen.lockOrientation('landscape');
$rootScope.lockBackgroundMode = 1;
var options = {
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    encodingType: Camera.EncodingType.JPEG,
    correctOrientation: true,
    saveToPhotoAlbum: false
};
$cordovaCamera.getPicture(options).then(function (imageData) {
    var documentObj = {
        vin: $rootScope.expVin,
        factura: $rootScope.expFactura,
        idDocumento: idDocumentoo,
        valor: imageData,
        estatus: "Pendiente"
    };
    $scope.getOneDocument(documentObj);
//screen.lockOrientation('portrait');
}, function (err) {
    console.log('Ocurrió un problema al tomar la foto.')
});
}

// pop up para ver o tomar foto
$scope.altaDocumento = function (idDocumento, valDocumento, tipo) {
    if (tipo === 'img') {
        var image = valDocumento.substring(0, 6);
        if (image == 'images') {
            $scope.tomarFoto(idDocumento);
        } else {
// An elaborate, custom popup
var myPopup = $ionicPopup.show({
    title: 'Foto',
    subTitle: 'Elige una acción',
    scope: $scope,
    buttons: [
    {
        text: 'Tomar foto',
        type: 'button-positive',
        onTap: function (e) {
            $scope.tomarFoto(idDocumento);
        }
    },
    {
        text: 'Ver foto',
        type: 'button-positive',
        onTap: function (e) {
            $scope.showImage(valDocumento);
        }
    }
    ]
});

myPopup.then(function (res) {
    console.log('Tapped!', res);
});
}
} else if (valDocumento !== '') {
    var documentObj = {
        vin: $rootScope.expVin,
        factura: $rootScope.expFactura,
        idDocumento: idDocumento,
        valor: valDocumento,
        estatus: "Pendiente"
    };
    $scope.getOneDocument(documentObj);
}
};

//visualiza la imagen seleccionada
$ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.modal = modal;
});

$scope.openModal = function () {
    $scope.modal.show();
};

$scope.closeModal = function () {
    $scope.modal.hide();
};

$scope.showImage = function (valDocumento) {
    $scope.imageSrc = valDocumento;
    $scope.openModal();
}

$scope.showDatePicker = function () {
    var options = {
        date: new Date(),
        mode: 'date',
        minDate: new Date() - 10000,
        allowOldDates: false,
    };
//var options = {date: new Date(), mode: 'time'}; for time
$cordovaDatePicker.show(options).then(function (date) {
    $scope.fecha = date;
    $scope.altaDocumento($scope.idDoc, $scope.fecha, 'dat');
});
};

$scope.testFileUpload = function (imgUrl,idDocumento) {
// Destination URL
var url = "http://192.168.20.9/myPhp/hola.php";

var filename = $rootScope.expVin+'-'+idDocumento+'.jpg';//imgUrls.split("/").pop();
var options = {
    fileKey: "file",
fileName: filename,//filename,
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
})