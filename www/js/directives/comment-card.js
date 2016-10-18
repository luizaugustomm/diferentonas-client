angular.module('Diferentonas')

.directive('dfCommentCard',['$http','ionicToast', 'ApiEndpoint', function($http,ionicToast,ApiEndpoint) {
  return {
    restrict: 'AE',
    scope: {
      "city": "=",
      "theme": "=",
      "initiative": "=",
      "comment": "="
    },
    templateUrl: 'templates/directives/comment-card.html',
    link: function(scope, element, attrs) {
      scope.getIcon = function() {
        switch (scope.comment.tipo) {
          case "coracao":
            return "icon-curtiu";
            break;
          case "coracao_partido":
            return "icon-nao-curtiu";
            break;
          case "bomba":
            return "icon-bomba";
            break;
          default:
            return "ion-minus"
            break;
        }
      }
      scope.likedComment = function(){
        var api = ApiEndpoint.url;
        //iniciativas/:iniciativa/opinioes/:opiniao/joinha
        $http.post(api.concat("/iniciativas/", scope.initiative.id, "/opinioes/",scope.comment.id,"/joinha"), {
          headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
          refreshComments(true);  //funcao que atualiza a contagem
        }).error(function(data) {
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
          console.log(scope.comment);
        });
      }

      scope.unlikedComment = function(){
        var api = ApiEndpoint.url;
        //iniciativas/:iniciativa/opinioes/:opiniao/joinha
        $http.delete(api.concat("/iniciativas/", scope.initiative.id, "/opinioes/",scope.comment.id,"/joinha"), {
          headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
          refreshComments(false); //funcao que atualiza a contagem
        }).error(function(data) {
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
          console.log(scope.comment);
        });
      }

      var refreshComments = function(like){
        if(like){
          scope.comment.numeroDeApoiadores = scope.comment.numeroDeApoiadores + 1;
          scope.comment.apoiada = true;
        }else{
          if(scope.comment.numeroDeApoiadores > 0){
            scope.comment.numeroDeApoiadores = scope.comment.numeroDeApoiadores - 1;
            scope.comment.apoiada = false;
          }
        }
      }
    }
  }
}]);
