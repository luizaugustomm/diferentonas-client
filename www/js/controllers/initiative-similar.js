angular.module('Diferentonas')

.controller('InitiativeSimilarCtrl', ['$stateParams', '$http','$ionicLoading', 'ionicToast','City', function($stateParams, $http,$ionicLoading, ionicToast,City) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    var api = "http://diferentonas.herokuapp.com/";
    vm.id = $stateParams.id_city;
    vm.score = $stateParams.score;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    // vm.initiative = vm.city.inicitivas[vm.id_initiative];
    if (!vm.city.hasData()) {
      // var api = 'http://0.0.0.0:9000/cidade/';
      $http.get(api.concat("cidade/", vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      })
      $http.get(api.concat("cidade/", vm.id, "/similares"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      })
      $http.get(api.concat("cidade/", vm.id, "/iniciativas"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.inicitivas = data;
          City.inicitivas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
          $http.get(api.concat("iniciativas/", vm.id_initiative, "/similares"), {
              headers: {'Access-Control-Allow-Origin': '*'}
          }).success(function(data) {
              vm.initiative.similar = data;
              $ionicLoading.hide();
          });
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
      $http.get(api.concat("iniciativas/", vm.id_initiative, "/similares"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.initiative.similar = data;
          $ionicLoading.hide();
      });
    }

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
