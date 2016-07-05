angular.module('Diferentonas')

.controller('InitiativeRepliesCtrl', ['$ionicHistory', '$stateParams', '$http', '$ionicLoading', 'ionicToast', 'City', 'ApiEndpoint', function($ionicHistory, $stateParams, $http, $ionicLoading, ionicToast, City, ApiEndpoint) {
    var vm = this;
    var api = ApiEndpoint.url;
    vm.id = $stateParams.id_city;
    vm.theme = $stateParams.theme;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    vm.replies = [];
    vm.reply = "";
    vm.submitReply = function() {
      $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
      $http.post(api.concat("/iniciativas/", vm.id_initiative, "/opinioes"), vm.replay, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Opinião enviada com sucesso.", 'bottom', false, 2500);
          vm.replies.push({ "text": vm.reply });
          vm.reply = "";
      }).error(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
      });
    }

    if (!vm.city.hasData()) {
      $http.get(api.concat("/cidade/", vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      })
      $http.get(api.concat("/cidade/", vm.id, "/similares"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      })
      $http.get(api.concat("/cidade/", vm.id, "/iniciativas"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.iniciativas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
          City.iniciativas = data;
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
