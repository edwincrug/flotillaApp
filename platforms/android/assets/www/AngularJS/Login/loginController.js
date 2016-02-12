registrationModule.controller("loginController", function ($scope, $route, $rootScope, loginRepository, alertFactory) {

    $scope.iniciarSesion = function(usuario, password){
        loginRepository.login(usuario, password)
          .then(function successCallback(response) {
                $rootScope.data = response;
                if($rootScope.data.data == null){
                  $scope.usuario = "";
                  $scope.password = "";
                  alert("El nombre de usuario o contraseña son incorrectos, verifique");
                }
                else{
                  location.href = '#/busqueda';
                }
                //alertFactory.success('Datos de flotillas cargados.');
          }, function errorCallback(response) {            
                alert("Ocurrio un problema, inténtelo más tarde");
                //alertFactory.info('No se encuentran datos con los criterios de búsqueda');
          });
    };

    $scope.irRegistro = function(){
      location.href = '#/registro';
    }

});
