angular.module('Diferentonas')

.controller('ProfileCtrl', ['$ionicHistory', 'UserService','$ionicActionSheet','$ionicLoading','$state', function($ionicHistory, UserService,$ionicActionSheet,$ionicLoading,$state) {
	var vm = this;
	vm.user = UserService.getUser();
	var response = vm.user.authResponse;

	vm.image = vm.user.picture;
	vm.name = vm.user.name;

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
	        	facebookConnectPlugin.logout(function(){

		        },function(error){
		        	console.log("error");
		        });

		        $state.go('login');
	        	UserService.deleteUser();
	        	console.log(UserService.getUser());
			}
		});
	};

	vm.goBack = function() {
		$ionicHistory.goBack();
	}
}]);
