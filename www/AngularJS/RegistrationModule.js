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
      //$rootScope.FlotillasDB = $cordovaSQLite.openDB("FlotillasDB.db");
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
                                                                                                 +'estatus  TEXT,'
                                                                                                 +'usuarioAsignado INTEGER)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadCatalogo (idCatalogo INTEGER NOT NULL PRIMARY KEY,'
                                                                                                +'idDocumento INTEGER NOT NULL,'
                                                                                                +'nombreDocumento TEXT NOT NULL)');

      $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadPropiedad (idUnidad  INTEGER NOT NULL PRIMARY KEY,'
                                                                                                 +'vin  TEXT NOT NULL,'
                                                                                                 +'factura  TEXT NOT NULL,'
                                                                                                 +'idDocumento  INTEGER NOT NULL,'
                                                                                                 +'valor  TEXT,'
                                                                                                 +'estatus  TEXT)'); 

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS DatosUsuario (idUsuario  INTEGER NULL,' + 'nombreCompleto TEXT NULL,' + 'nombreUsuario  TEXT NULL,' + 'idRol  INTEGER NULL,' + 'password TEXT NULL,' + 'huboCambio INTEGER NULL' + 'descripcionRol TEXT NULL)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS Rol (idRol  INTEGER NOT NULL PRIMARY KEY,' + 'descripcion  TEXT NOT NULL)');

            var query = "INSERT INTO Rol (descripcion) VALUES('Gestor'), ('Apoyo'), ('Transladista'), ('Ejecutivo de Cuenta'), ('Administrador'); "
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, []).then(function (result) {
                //alert("Se poblo la tabla de roles");
            }, function (error) {
                alert(error);
            });

            query = "SELECT * FROM DatosUsuario ";
            $cordovaSQLite.execute($rootScope.FlotillasDB, query).then(function (result) {
                if (result.rows.length > 0) {
                    $rootScope.totalRegistros = result.rows.length;
                    //alert('Total registros: ' + $rootScope.totalRegistros);
                } else {
                    //alert('Cero registros');
                    $rootScope.totalRegistros = 0;
                }
            }, function (error) {
                alert('Problemas para consultar la BD');
                $rootScope.totalRegistros = 0;
            });

            query = "INSERT INTO LicitacionUnidad (vin, factura, idLicitacion, tipo, marca, modelo, numeroMotor, color, estatus, usuarioAsignado) VALUES('1FBAX2CM0FKA56032', 'AA000013433', 0, 'TIPO1', 'FORD', '2010', 'NUMMOTOR1', 'GRIS', '', 42), ('2GCBY3DN1GLB67143', 'BB111124544', 0, 'TIPO2', 'VW', '2013', 'NUMMOTOR2', 'ROJO', '', 42),  ('3HDCZ4EM2HMC78254', 'CC222235655', 0, 'TIPO3', 'SEAT', '2015', 'NUMMOTOR3', 'AZUL', '', 42), ('1FBAX2CM0FKA56032', 'AA000013433', 0, 'TIPO4', 'NISSAN', '2011', 'NUMMOTOR4', 'BLANCO', '', 41), ('1FBAX2CM0FKA56032', 'AA000013433', 0, 'TIPO5', 'MAZDA', '2016', 'NUMMOTOR5', 'NEGRO', '', 41);"
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, []).then(function (result) {
                //alert("Se poblo la tabla LicitacionUnidad");
            }, function (error) {
                alert(error);
            });
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
        'busqueda-tab': {
          templateUrl: "templates/Expediente.html",
          controller: 'expedienteController'
        }
      }
    })
    .state('tabs.consultaExpediente', {
      url: "/consultaExpediente",
      views: {
        'consulta-tab': {
          templateUrl: "templates/ConsultaExpediente.html",
          controller: 'consultaController'
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