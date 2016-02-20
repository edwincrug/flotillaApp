registrationModule.controller("loginController", function ($scope, $rootScope,$state,loginRepository) {
 
    //Grupo de funciones de inicio
    $scope.init = function () {
      $rootScope.logged = false;
      $rootScope.showTabs = false;
    };

    $scope.iniciarSesion = function(usuario, password){
        /*loginRepository.login(usuario, password)
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
          });*/
          location.href = '#/tab/busqueda';
          //ui-sref="tabs.busqueda"
    };

    $scope.irRegistro = function(){
      location.href = '#/registro';
    }
});
