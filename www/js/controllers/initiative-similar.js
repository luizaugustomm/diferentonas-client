angular.module('Diferentonas')

.controller('InitiativeSimilarCtrl', ['$stateParams', '$http', '$ionicLoading', 'ionicToast', 'City', 'Initiative', function($stateParams, $http,$ionicLoading, ionicToast, City, Initiative) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.theme = $stateParams.theme;

    vm.initiative = Initiative.get({id: $stateParams.id}, function() {
      // TODO issue #54 Remover essa chamada quando o objeto cidade já estiver incluso na iniciativa
      vm.initiative.city = City.get({id: $stateParams.id_city});
      vm.initiative.similars = Initiative.similars.query({id: $stateParams.id}, function() {
        $ionicLoading.hide();
      }, function(error) {
        $ionicLoading.hide();
      });
    }, function(error) {
      $ionicLoading.hide();
    });

    vm.followInitiative = function() {
      console.log("seguindo");
      console.log(vm.id_initiative);
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      var api = 'http://diferentonas.herokuapp.com/iniciativas/';

      $http.post(api.concat(vm.id_initiative, "/inscritos"), vm.id_initiative, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Seguindo iniciativa!", 'bottom', false, 2500);
          })
        .error(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
      });

    }
}]);
