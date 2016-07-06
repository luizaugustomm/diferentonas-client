angular.module('Diferentonas')

.controller('InitiativesCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', 'City', function($ionicHistory, $stateParams, $http, $ionicLoading, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.initiatives = [];
    vm.CityResource = City;
    vm.theme = $stateParams.theme;
    vm.city = City.get({id: $stateParams.id_city}, function() {
        vm.city.getInitiativeStatus = City.getInitiativeStatus;
        var allInitiatives = City.initiatives.query({id: $stateParams.id_city}, function() {
          vm.hasInitiatives = function() {
            return vm.initiatives.length > 0;
          }
          allInitiatives.forEach(function(initiative) {
            if (initiative.area === vm.theme) {
              vm.initiatives.push(initiative);
            }
          });
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
