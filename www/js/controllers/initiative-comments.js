angular.module('Diferentonas')

.controller('InitiativeCommentsCtrl', ['$scope', '$ionicHistory', '$stateParams', '$http','$ionicLoading', 'ionicToast', 'City', 'Initiative', 'ApiEndpoint', function($scope, $ionicHistory, $stateParams, $http,$ionicLoading, ionicToast, City, Initiative, ApiEndpoint) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.moreData = true;
    vm.np = 0;
    vm.theme = $stateParams.theme;
    vm.comments = [];
    vm.comment = {
      "tipo": "",
      "conteudo": ""
    };
    var api = ApiEndpoint.url;

    vm.initiative = Initiative.get({id: $stateParams.id_initiative}, function() {
      // TODO issue #54 Remover essa chamada quando o objeto cidade já estiver incluso na iniciativa
      vm.initiative.city = City.get({id: $stateParams.id_city});
      vm.initiative.similars = Initiative.similars.query({id: $stateParams.id_initiative}, function() {
        refreshComments();
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

    vm.selectReaction = function(reaction) {
      vm.comment.tipo = reaction;
    }

    vm.isReadyToSend = function() {
      return (vm.comment.tipo && vm.comment.conteudo);
    }

    vm.submitComment = function() {
      $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
      $http.post(api.concat("/iniciativas/", $stateParams.id_initiative, "/opinioes"), vm.comment, {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Discussão lançada!", 'bottom', false, 2500);
          vm.comments.unshift(vm.comment);
          vm.comment = {
            "tipo": "",
            "conteudo": ""
          };
          refreshComments();
      }).error(function(data) {
          $ionicLoading.hide();
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
      });
    }

    var refreshComments = function() {
      $http.get(api.concat("/iniciativas/", $stateParams.id_initiative, "/opinioes?pagina=0&tamanhoPagina=10"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.comments = data;
          if(vm.comments.length === 0){
            vm.moreData = false;
          }else{
            vm.moreData = true;
          }
          vm.np = 1;
          $ionicLoading.hide();
      })
    }

    vm.loadMore = function() {
      $http.get(api.concat("/iniciativas/", $stateParams.id_initiative, "/opinioes?pagina=", vm.np, "&tamanhoPagina=10"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          console.log("Current page = " + vm.np);
          if(data.length === 0){
            ionicToast.show("Não existem mais comentários", 'bottom', false, 2000);
            vm.moreData = false;
          }else{
            vm.comments = vm.comments.concat(data);
            vm.moreData = true;
            vm.np++;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $ionicLoading.hide();
      }).error(function() {
        $ionicLoading.hide();
        ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2000);
      })
    };

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
