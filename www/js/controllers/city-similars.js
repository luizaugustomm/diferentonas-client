angular.module('Diferentonas')

.controller('CitySimilarsCtrl', ['$ionicHistory', 'ionicToast', '$stateParams', '$http', '$ionicLoading', '$ionicScrollDelegate', 'City', 'ApiEndpoint', function($ionicHistory, ionicToast, $stateParams, $http, $ionicLoading, $ionicScrollDelegate, City, ApiEndpoint) {
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
