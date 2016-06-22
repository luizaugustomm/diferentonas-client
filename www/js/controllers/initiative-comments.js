angular.module('Diferentonas')

.controller('InitiativeCommentsCtrl', ['$stateParams', '$http','$ionicLoading', 'ionicToast', 'City', 'Initiative', function($stateParams, $http,$ionicLoading, ionicToast, City, Initiative) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.theme = $stateParams.theme;
    vm.comments = [];
    vm.comment = {
      "tipo": "",
      "conteudo": ""
    };
    var api = 'http://diferentonas.herokuapp.com';

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

    vm.selectReaction = function(reaction) {
      vm.comment.tipo = reaction;
    }
    vm.isReadyToSend = function() {
      return (vm.comment.tipo && vm.comment.conteudo);
    }
    vm.submitComment = function() {
      $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
      $http.post(api.concat("/iniciativas/", $stateParams.id, "/opinioes"), vm.comment, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Discussão lançada!", 'bottom', false, 2500);
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
      $http.get(api.concat("/iniciativas/", $stateParams.id, "/opinioes?pagina=0&tamanhoPagina=10"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.comments = data;
      })
    }
    refreshComments();
}]);
