angular.module('Diferentonas')

.controller('InitiativesCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', 'City', function($ionicHistory, $stateParams, $http, $ionicLoading, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.initiatives = [];
    vm.CityResource = City;
    vm.theme = $stateParams.theme;
    vm.city = City.get({id: $stateParams.id_city}, function() {
        vm.city.getInitiativeStatus = City.getInitiativeStatus;
        vm.initiatives = City.initiatives.query({id: $stateParams.id_city}, function() {
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
