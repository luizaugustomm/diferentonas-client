angular.module('Diferentonas')

.controller('ProfileCtrl', ['$ionicHistory', 'UserService','$ionicActionSheet','$ionicLoading','$state','$auth', '$location', 'ionicToast', function($ionicHistory, UserService,$ionicActionSheet,$ionicLoading,$state,$auth,$location,ionicToast) {
	$ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });

	var vm = this;

	UserService.get(function(response) {
		vm.user = response;
		$ionicLoading.hide();
	}, function(error) {
		$ionicLoading.hide();
		ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
		$ionicHistory.goBack();
	});

	vm.logout = function (){
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Sair',
			titleText: 'Você realmente deseja sair?',
			cancelText: 'Cancelar',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				if (!$auth.isAuthenticated()) { return; }
				$auth.logout()
					.then(function() {
						$location.path('/login');
					});
			}
		});
	};

	vm.goBack = function() {
		$ionicHistory.goBack();
	}
}]);
