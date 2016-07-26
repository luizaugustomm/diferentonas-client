angular.module('Diferentonas')

.controller('InitiativesCtrl', ['$ionicHistory','ionicToast','$stateParams', '$http', '$ionicLoading', 'City', function($ionicHistory,ionicToast,$stateParams, $http, $ionicLoading, City) {
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
      if(error.status === 500){
        ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
        $ionicHistory.goBack();
      }
    });

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
