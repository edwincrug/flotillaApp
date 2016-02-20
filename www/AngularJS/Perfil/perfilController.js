registrationModule.controller("perfilController", function ($scope,loginRepository) {
    
	 //$scope.nombreCompleto = $rootScope.data.data.nombreCompleto;

	 $scope.settingsMenu = {
        theme: 'mobiscroll',
        display: 'top',
        type: 'options',
        select: 'single',
        onItemTap: function (item, inst) {
            $('.md-tab').removeClass('md-tab-sel');
            $('.' + item.data('tab')).addClass('md-tab-sel');
        }
    };
});