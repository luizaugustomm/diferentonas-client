angular.module('Diferentonas')

.controller('CityNewsCtrl', ['$ionicHistory', '$stateParams', '$ionicLoading', 'City', function($ionicHistory, $stateParams, $ionicLoading, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.getScoreText = City.getScoreText;
      vm.city.news = City.news.query({id: $stateParams.id_city}, function() {
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
