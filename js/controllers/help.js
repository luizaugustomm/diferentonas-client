angular.module('Diferentonas')

.controller('HelpCtrl', ['$ionicHistory', function($ionicHistory) {
	var vm = this;

	vm.goBack = function() {
		$ionicHistory.goBack();
	}
}]);
