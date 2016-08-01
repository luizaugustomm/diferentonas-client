angular.module('Diferentonas')

.controller('InitiativeSimilarsCtrl', ['$ionicHistory','$state','$stateParams', '$http', '$ionicLoading', 'ionicToast', 'City', 'Initiative', 'ApiEndpoint', function($ionicHistory,$state,$stateParams, $http, $ionicLoading, ionicToast, City, Initiative, ApiEndpoint) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.theme = $stateParams.theme;

    vm.initiative = Initiative.get({id: $stateParams.id_initiative}, function() {
      // TODO issue #54 Remover essa chamada quando o objeto cidade já estiver incluso na iniciativa
      vm.initiative.city = City.get({id: $stateParams.id_city});
      vm.initiative.similars = Initiative.similars.query({id: $stateParams.id_initiative}, function() {
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

    vm.followInitiative = function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      var api = ApiEndpoint.url + '/iniciativas/';

      if (vm.initiative.seguidaPeloRequisitante) {
        $http.delete(api.concat(vm.initiative.id, "/inscritos"), vm.initiative.id, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = false;
            $ionicLoading.hide();
            ionicToast.show("Parou de seguir a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      } else {
        $http.post(api.concat(vm.initiative.id, "/inscritos"), vm.initiative.id, {
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
      console.log("Iniciativa #" + vm.initiative.id + " está sendo seguida? " + vm.initiative.seguidaPeloRequisitante);
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
