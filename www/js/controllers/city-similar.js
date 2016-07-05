angular.module('Diferentonas')

.controller('CitySimilarCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', '$ionicScrollDelegate', 'City', function($ionicHistory, $stateParams, $http, $ionicLoading, $ionicScrollDelegate, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id}, function() {
      vm.city.similars = City.similars.query({id: $stateParams.id}, function() {
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
