angular.module('Diferentonas')

.controller('ThemesCtrl', ['$stateParams', '$http', '$ionicLoading', 'City', 'Initiative', function($stateParams, $http, $ionicLoading, City, Initiative) {
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

}]);
