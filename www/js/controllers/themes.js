angular.module('Diferentonas')

.controller('ThemesCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', 'City', 'Initiative', function($ionicHistory, $stateParams, $http, $ionicLoading, City, Initiative) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.initiatives = [];
    vm.CityResource = City;
    vm.theme = $stateParams.theme;
    vm.city = City.get({id: $stateParams.id}, function() {
        vm.initiatives = City.initiatives.query({id: $stateParams.id}, function() {
        $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
      });
    }, function(error) {
      $ionicLoading.hide();
    });

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
