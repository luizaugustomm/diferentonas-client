angular.module('Diferentonas')

.controller('InitiativeCtrl', ['$stateParams', '$http','$ionicLoading', 'ionicToast','City', function($stateParams, $http,$ionicLoading, ionicToast,City) {
    var vm = this;
    vm.id = $stateParams.id_city;
    vm.score = $stateParams.score;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    // vm.initiative = vm.city.inicitivas[vm.id_initiative];
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
          vm.city.inicitivas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
          City.inicitivas = data;
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
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
