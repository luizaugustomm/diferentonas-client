angular.module('Diferentonas')

.controller('CityThemesCtrl', ['$ionicHistory','ionicToast','$stateParams', '$http', '$ionicLoading', '$ionicScrollDelegate', 'City', function($ionicHistory,ionicToast, $stateParams, $http, $ionicLoading, $ionicScrollDelegate, City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.CityResource = City;
    vm.city = City.get({id: $stateParams.id_city}, function() {
      vm.city.hasDifferentThemes = City.hasDifferentThemes(vm.city.scores);
      vm.city.hasNeutralThemes = City.hasNeutralThemes(vm.city.scores);
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      if(error.status === 500){
        ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
        $ionicHistory.goBack();
      }
    });
    vm.showNeutralThemes = false;

    vm.orderByScore = function(score) {
      if (score.area == "TOTAL GERAL" && City.isNeutral(score.valorScore)) {
        return 10;
      }
      return Math.abs(score.valorScore)*-1;
    }
    vm.toggleNeutralThemes = function() {
      vm.showNeutralThemes = !vm.showNeutralThemes;
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

    vm.followCity= function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      /*
      var api = ApiEndpoint.url + '/iniciativas/';
      
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
      */
    }

}]);
