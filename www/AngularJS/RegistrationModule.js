var registrationModule = angular.module('registrationModule', ['ngRoute', 'ngAnimate','mobiscroll-datetime','mobiscroll-form','mobiscroll-listview',
    'mobiscroll-calendar',
    'mobiscroll-select',
    'mobiscroll-menustrip'])
.config(function ($routeProvider, $provide) {

    $routeProvider.when('/', {
        templateUrl: 'AngularJS/Templates/Login.html',
        controller: 'loginController'
    });

    $routeProvider.when('/registro', {
        templateUrl: 'AngularJS/Templates/Registro.html',
        controller: 'loginController'
    });

    $routeProvider.when('/consulta', {
        templateUrl: 'AngularJS/Templates/ConsultaExpediente.html',
        controller: 'consultaController'
    });

    $routeProvider.when('/main', {
        templateUrl: 'AngularJS/Templates/Main.html',
        controller: 'mainController'
    });

    $routeProvider.when('/pag1', {
        templateUrl: 'AngularJS/Templates/pag1.html',
        controller: 'mainController'
    });

    $routeProvider.when('/busqueda', {
        templateUrl: 'AngularJS/Templates/Busqueda.html',
        controller: 'busquedaController'
    });

    $routeProvider.when('/expediente', {
        templateUrl: 'AngularJS/Templates/Expediente.html',
        controller: 'expedienteController'
    });

    var settings = {
        theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
        lang: 'es',    // Specify language like: lang: 'pl' or omit setting to use default
        display: '',  // Specify display mode like: display: 'bottom' or omit setting to use default
        mode: ''       // More info about mode: http://docs.mobiscroll.com/angular/2-17-1/datetime#!opt-mode
    };

    $provide.decorator('$rootScope',['$delegate', function($delegate) {
        for(var i =0;i<settings.length;i++){
            $delegate[settings[i]] = $scope[settings[i]];    
        }
        return $delegate;
    }]);
});
