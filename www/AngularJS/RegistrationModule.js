var registrationModule = angular.module('registrationModule', ['ngRoute', 'ngAnimate', 'mobiscroll-datetime'])
.config(function ($routeProvider, $locationProvider, $provide) {

    $routeProvider.when('/', {
        templateUrl: '/AngularJS/Templates/Main.html',
        controller: 'mainController'
    });

    $locationProvider.html5Mode(true);

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


registrationModule.run(function ($rootScope) {
    $rootScope.empleado = "";
    $rootScope.cliente = "";
})


