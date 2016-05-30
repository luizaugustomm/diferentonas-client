angular.module('Diferentonas')

.controller('InitiativeCommentsCtrl', ['$stateParams', '$http', '$ionicLoading', 'ionicToast', 'City', function($stateParams, $http, $ionicLoading, ionicToast, City) {
    var vm = this;
    var api = "http://diferentonas.herokuapp.com";
    vm.id = $stateParams.id_city;
    vm.score = $stateParams.score;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    vm.comments = [];
    vm.comment = {
      "tipo": "",
      "conteudo": ""
    };
    vm.selectReaction = function(reaction) {
      vm.comment.tipo = reaction;
    }
    vm.isReadyToSend = function() {
      return (vm.comment.tipo && vm.comment.conteudo);
    }
    vm.submitComment = function() {
      $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
      $http.post(api.concat("/iniciativas/", vm.id_initiative, "/opinioes"), vm.comment, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Discurssão lançada!", 'bottom', false, 2500);
          vm.comments.push(vm.comment);
          vm.comment = {
            "tipo": "",
            "conteudo": ""
          };
      }).error(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
      });
    }

    var refreshComments = function() {
      $http.get(api.concat("/iniciativas/", vm.id_initiative, "/opinioes?pagina=0&tamanhoPagina=10"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.comments = data;
      })
    }
    refreshComments();

    if (!vm.city.hasData()) {
      $http.get(api.concat("/cidade/", vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      });
      $http.get(api.concat("/cidade/", vm.id, "/similares"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      });
      $http.get(api.concat("/cidade/", vm.id, "/iniciativas"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.inicitivas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
          City.inicitivas = data;
      });
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.inicitivas, vm.id_initiative);
    }
}]);
