// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Módulo de la aplicación
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module('registrationModule', ['ionic','ngCordova','mobiscroll-datetime','mobiscroll-form','mobiscroll-listview',
    'mobiscroll-calendar',
    'mobiscroll-select',
    'mobiscroll-menustrip',
    'ui.router']);

registrationModule.run(function($ionicPlatform,$cordovaSQLite, $rootScope){
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if($cordovaSQLite && window.sqlitePlugin !== undefined){
      $rootScope.FlotillasDB = window.sqlitePlugin.openDatabase({name: "FlotillasDB.db", createFromLocation: 1});
      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS Bitacora (idBitacora INTEGER NOT NULL PRIMARY KEY,'
                                                                                          +'idUsuario INTEGER,'
                                                                                          +'idDocumento INTEGER,'
                                                                                          +'vin TEXT,'
                                                                                          +'fecha TEXT,'
                                                                                          +'accion  TEXT)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS HistorialSincronizacion (idSincronizacion  INTEGER NOT NULL PRIMARY KEY,'
                                                                                                        +'fecha TEXT NOT NULL,'
                                                                                                        +'numDocumentos INTEGER NOT NULL)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS LicitacionUnidad (vin  TEXT NOT NULL PRIMARY KEY,'
                                                                                                 +'factura  TEXT,'
                                                                                                 +'idLicitacion INTEGER,'
                                                                                                 +'tipo TEXT,'
                                                                                                 +'marca  TEXT,'
                                                                                                 +'modelo TEXT,'
                                                                                                 +'numeroMotor  TEXT,'
                                                                                                 +'color  TEXT,'
                                                                                                 +'estatus  TEXT)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadCatalogo (idCatalogo INTEGER NOT NULL PRIMARY KEY,'
                                                                                                +'idDocumento INTEGER NOT NULL,'
                                                                                                +'nombreDocumento TEXT NOT NULL)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadPropiedad (idUnidad  INTEGER NOT NULL PRIMARY KEY,'
                                                                                                 +'vin  TEXT NOT NULL,'
                                                                                                 +'idDocumento  INTEGER NOT NULL,'
                                                                                                 +'valor  TEXT,'
                                                                                                 +'estatus  TEXT)');
    }

  });
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