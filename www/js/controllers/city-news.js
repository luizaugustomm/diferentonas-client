angular.module('Diferentonas')

.controller('CityNewsCtrl', ['$scope', 'ionicToast', '$ionicHistory', '$stateParams', '$ionicLoading', '$http', 'City', 'ApiEndpoint', function($scope, ionicToast, $ionicHistory, $stateParams, $ionicLoading, $http, City, ApiEndpoint) {
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
        $scope.$broadcast('scroll.infiniteScrollComplete');
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


    vm.followCity= function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa

      var api = ApiEndpoint.url + '/cidade/';

      if (vm.city.seguidaPeloRequisitante) {
        $http.delete(api.concat(vm.city.id, "/inscritos"), vm.city.id, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.city.seguidaPeloRequisitante = false;
            $ionicLoading.hide();
            ionicToast.show("Parou de seguir a cidade!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      } else {
        $http.post(api.concat(vm.city.id, "/inscritos"), vm.city.id, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.city.seguidaPeloRequisitante = true;
            $ionicLoading.hide();
            ionicToast.show("Está seguindo a cidade!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      }
      console.log("Cidade #" + vm.city.id + " está sendo seguida? " + vm.city.seguidaPeloRequisitante);

    }

}]);
