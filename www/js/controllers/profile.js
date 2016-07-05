angular.module('Diferentonas')

.controller('ProfileCtrl', ['$ionicHistory', 'UserService', function($ionicHistory, UserService) {
	var vm = this;
	vm.image = UserService.getUser().picture;
	vm.name = UserService.getUser().name;

	vm.goBack = function() {
		$ionicHistory.goBack();
	}
}]);
