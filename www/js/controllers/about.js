angular.module('Diferentonas')

.controller('AboutCtrl', ['$ionicHistory', function($ionicHistory) {
	var vm = this;

	vm.goBack = function() {
		$ionicHistory.goBack();
	}
}]);
