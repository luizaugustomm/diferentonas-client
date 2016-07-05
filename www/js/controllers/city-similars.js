angular.module('Diferentonas')

.controller('CitySimilarsCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', '$ionicScrollDelegate', 'City', function($ionicHistory, $stateParams, $http, $ionicLoading, $ionicScrollDelegate, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.similars = City.similars.query({id: $stateParams.id_city}, function() {
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
