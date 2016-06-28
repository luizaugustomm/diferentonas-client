angular.module('Diferentonas')

.controller('ProfileCtrl', ['UserService', function(UserService) {
	var vm = this;
	vm.image = UserService.getUser().picture;
	vm.name = UserService.getUser().name;
}]);
