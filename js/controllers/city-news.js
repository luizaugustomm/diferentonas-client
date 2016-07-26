angular.module('Diferentonas')

.controller('CityNewsCtrl', ['$scope', 'ionicToast', '$ionicHistory', '$stateParams', '$ionicLoading', 'City', function($scope, ionicToast, $ionicHistory, $stateParams, $ionicLoading, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.moreData = true;
    vm.np = 0;

    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.getScoreText = City.getScoreText;
      vm.city.getInitiativeStatus = City.getInitiativeStatus;
      vm.city.news = City.news.query({id: $stateParams.id_city, npagina : 0}, function() {
        if(vm.city.news.length === 0){
          vm.moreData = false;
        }else{
          vm.moreData = true;
        }
        vm.np = 1;
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

    vm.loadMore = function() {
      var items = City.news.query({id: $stateParams.id_city, npagina : vm.np}, function() {
        console.log("Current page = " + vm.np);
        if (items.length === 0){
          ionicToast.show("Não existem mais novidades", 'bottom', false, 2000);
          vm.moreData = false;
        } else {
          vm.city.news = vm.city.news.concat(items);
          vm.moreData = true;
          vm.np++;
        }
        items = [];
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
      }, function() {
        $ionicLoading.hide();
        ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2000);
      });
    };

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
