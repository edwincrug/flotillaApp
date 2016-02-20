var db = null;
var registrationModule = angular.module('registrationModule', ['ionic','ngCordova','mobiscroll-datetime','mobiscroll-form','mobiscroll-listview',
    'mobiscroll-calendar',
    'mobiscroll-select',
    'mobiscroll-menustrip',
    'ui.router']);

registrationModule.run(function($ionicPlatform, $rootScope,$cordovaSQLite){
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //if($cordovaSQLite && window.sqlitePlugin !== undefined){
        //var FlotillasDB = $cordovaSQLite.openDB({name:"FlotillasApp.db"});
        db = $cordovaSQLite.openDB({name:"myDataBase.db"});
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people(id integer primary key, firstName text, lastName text)");

        /*$cordovaSQLite.execute(FlotillasDB,'CREATE TABLE IF NOT EXISTS Bitacora (' 
          +'idBitacora  NUMERIC NOT NULL AUTOINCREMENT,'
          +'idUsuario NUMERIC,'
          +'idDocumento NUMERIC,'
          +'vin TEXT,'
          +'fecha TEXT,'
          +'accion  TEXT,'
          +'PRIMARY KEY(idBitacora))');

        if(FlotillasDB != null){
          var query = "INSERT INTO Bitacora (idUsuario, idDocumento, vin, fecha, accion) VALUES (?,?,?,?,?)";
              $cordovaSQLite.execute(FlotillasDB, query, [23, 7,'VJJ2432534','18/02/2016 11:29 p.m.', 'Insertó']).then(function(res) {
                alert("insertId: " + res.insertId);
              }, function (err) {
                alert(err);
              });
          }
        else{
          alert(FlotillasDB);
        }*/
  });
});

registrationModule.controller('backgroundController', function($scope, $cordovaSQLite){
  $scope.init = function(){
     document.addEventListener('deviceready', function() {
      alert('background');
      cordova.plugins.backgroundMode.setDefaults({ 
          title:  'FlotillasApp',
          text:   'FlotillasApp ejecutándose.',
          ticker: 'FlotillasApp ejecutándose.'
      });
      cordova.plugins.backgroundMode.enable();

      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function() {
        //alert('hello');
        $scope.insert('vlad','juarez');
        $scope.selectPer('juarez');
      }
    });
  }

  $scope.idPeople = 0;
  $scope.validaDB = function(){
    if(db != null){
      alert('the database was created!');
    }
    else{
      alert(db);
    }

  }
  
  $scope.insert = function(firstName, lastName){
   var query = "INSERT INTO people (firstName, lastName) VALUES(?, ?)";
    $cordovaSQLite.execute(db, query, [firstName, lastName]).then(function(result){
      $scope.idPeople = result.insertedId;
      alert("this record was inserted:"+ result.insertId); 
      //console.log("INSERT ID ->" + result.insertId);
    }, function(error){
      //console.log(error);
      alert(error);
    });
  }

  $scope.selectPer = function(lastName){
    var query = "SELECT id, firstName, lastName FROM people WHERE lastName = ?";
    $cordovaSQLite.execute(db, query, [lastName]).then(function(result){
      if(result.rows.length > 0){
        alert("SELECTED ->"+ result.rows.item(0).id+ " " + result.rows.item(0).firstName + " "+ result.rows.item(0).lastName);
        //console.log("SELECTED ->" + result.rows.item(0).firstName + " "+ res.rows.item(0).lastName);
      } 
      else{
        alert("NO ROWS EXISTS");
        //console.log("NO ROWS EXISTS");
      }       
    }, function(error){
      console.log(error);
    });
  }

});

registrationModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/Login.html",
      controller: 'loginController'
    })
    .state('tabs.busqueda', {
      url: "/busqueda",
      views: {
        'busqueda-tab': {
          templateUrl: "templates/Busqueda.html",
          controller: 'busquedaController'
        }
      }
    })
    .state('tabs.expediente', {
      url: "/expediente",
      views: {
        'expediente-tab': {
          templateUrl: "templates/Expediente.html",
          controller: 'expedienteController'
        }
      }
    })
    .state('tabs.sincronizacion', {
      url: "/sincronizacion",
      views: {
        'sincronizacion-tab': {
          templateUrl: "templates/HistorialSincronizacion.html",
          controller: 'historialSincronizacionController'
        }
      }
    })
    .state('tabs.perfil', {
      url: "/perfil",
      views: {
        'perfil-tab': {
          templateUrl: "templates/Perfil.html",
          controller: 'perfilController'
        }
      }
    });

   $urlRouterProvider.otherwise("/login");
})