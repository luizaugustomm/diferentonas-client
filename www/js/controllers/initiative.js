angular.module('Diferentonas')

.controller('InitiativeCtrl', ['$stateParams', '$http','$ionicLoading', 'ionicToast','City', function($stateParams, $http,$ionicLoading, ionicToast,City) {
    var vm = this;
    vm.id = $stateParams.id_city;
    vm.theme = $stateParams.theme;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    // vm.initiative = vm.city.iniciativas[vm.id_initiative];
    if (!vm.city.hasData()) {
      var api = 'http://diferentonas.herokuapp.com/cidade/';
      // var api = 'http://0.0.0.0:9000/cidade/';
      $http.get(api.concat(vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      })
      $http.get(api.concat(vm.id).concat('/similares'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      })
      $http.get(api.concat(vm.id).concat('/iniciativas'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.iniciativas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
          City.iniciativas = data;
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
    }

    vm.followInitiative = function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      var api = 'http://diferentonas.herokuapp.com/iniciativas/';

      if (vm.initiative.seguidaPeloRequisitante) {
        $http.delete(api.concat(vm.id_initiative, "/inscritos"), vm.id_initiative, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = false;
            $ionicLoading.hide();
            ionicToast.show("Parou de seguir a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      } else {
        $http.post(api.concat(vm.id_initiative, "/inscritos"), vm.id_initiative, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = true;
            $ionicLoading.hide();
            ionicToast.show("Está seguindo a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      }
      console.log("Iniciativa #" + vm.id_initiative + " está sendo seguida? " + vm.initiative.seguidaPeloRequisitante);
    }
}]);
