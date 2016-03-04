// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 11/02/2016
// -- Description: Módulo de la aplicación
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module('registrationModule', ['ionic', 'ngCordova', 'ui.router', 'angular-datepicker']);

registrationModule.run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $cordovaDatePicker) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }



        if ($cordovaSQLite && window.sqlitePlugin !== undefined) {
            $rootScope.FlotillasDB = window.sqlitePlugin.openDatabase({
                name: "FlotillasDB.db",
                createFromLocation: 1
            });
            //$rootScope.FlotillasDB = $cordovaSQLite.openDB("FlotillasDB.db");
            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS Bitacora (idBitacora INTEGER NOT NULL PRIMARY KEY,' + 'idUsuario INTEGER,' + 'idDocumento INTEGER,' + 'vin TEXT,' + 'fecha TEXT,' + 'accion  TEXT)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS HistorialSincronizacion (idSincronizacion  INTEGER NOT NULL PRIMARY KEY,' + 'fecha DATETIME NOT NULL,' + 'numDocumentos INTEGER NOT NULL)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS LicitacionUnidad (vin  TEXT NOT NULL PRIMARY KEY,' + 'factura  TEXT,' + 'idLicitacion INTEGER,' + 'tipo TEXT,' + 'marca  TEXT,' + 'modelo TEXT,' + 'numeroMotor  TEXT,' + 'color  TEXT,' + 'estatus  TEXT,' + 'usuarioAsignado INTEGER)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadCatalogo (idCatalogo INTEGER NOT NULL PRIMARY KEY,' + 'idDocumento INTEGER NOT NULL,' + 'nombreDocumento TEXT NOT NULL)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS UnidadPropiedad (vin  TEXT NOT NULL,' + 'factura  TEXT NOT NULL,' + 'idDocumento  INTEGER NOT NULL,' + 'valor  TEXT,' + 'estatus  TEXT)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS RolDocumento (idRol INTEGER NOT NULL,' + 'orden INTEGER NOT NULL,' + 'idDocumento INTEGER NOT NULL,' + 'tituloDoc TEXT NOT NULL,' + 'valor TEXT,' + 'tipo TEXT,' + 'estatus TEXT)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS DatosUsuario (idUsuario  INTEGER NULL,' + 'nombreCompleto TEXT NULL,' + 'nombreUsuario  TEXT NULL,' + 'idRol  INTEGER NULL,' + 'password TEXT NULL,' + 'huboCambio INTEGER NULL,' + 'descripcionRol TEXT NULL)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS Rol (idRol  INTEGER NOT NULL,' + 'descripcion  TEXT NOT NULL)');

            $cordovaSQLite.execute($rootScope.FlotillasDB, 'CREATE TABLE IF NOT EXISTS RolDocumento (idRol INTEGER NOT NULL,' + 'idDocumento INTEGER NOT NULL,' + 'documento TEXT NOT NULL)');

            var query = "INSERT INTO Rol (idRol, descripcion) VALUES(1, 'Gestor'), (2, 'Apoyo'), (4, 'Transladista'), (5, 'Ejecutivo de Cuenta'), (6, 'Administrador'); "
            $cordovaSQLite.execute($rootScope.FlotillasDB, query, []).then(function (result) {
                //alert("Se poblo la tabla de roles");
            }, function (error) {
                alert(error);
            });
        }

    });
});


registrationModule.config(function ($stateProvider, $urlRouterProvider) {
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
        .state('registro', {
            url: "/registro",
            templateUrl: "templates/Registro.html",
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