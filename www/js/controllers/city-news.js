angular.module('Diferentonas')

.controller('CityNewsCtrl', ['ionicToast', '$ionicHistory', '$stateParams', '$ionicLoading', 'City', function(ionicToast, $ionicHistory, $stateParams, $ionicLoading, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.getScoreText = City.getScoreText;
      vm.city.getInitiativeStatus = City.getInitiativeStatus;
      vm.city.news = City.news.query({id: $stateParams.id_city}, function() {
        $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
        if(error.status === 500){
          ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
          $ionicHistory.goBack();
        }
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
