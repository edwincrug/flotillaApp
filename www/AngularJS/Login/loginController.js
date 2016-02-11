registrationModule.controller("loginController", function ($scope, $route, $rootScope, loginRepository, alertFactory) {

    $scope.iniciarSesion = function(usuario, password){
        loginRepository.login(usuario, password)
          .then(function successCallback(response) {
                $rootScope.data = response;
                alertFactory.success("si funciona");
                //alertFactory.success('Datos de flotillas cargados.');
          }, function errorCallback(response) {            
                alert("no funciona");
                //alertFactory.info('No se encuentran datos con los criterios de búsqueda');
          });
    };

});
