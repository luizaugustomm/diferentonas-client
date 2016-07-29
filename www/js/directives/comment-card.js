angular.module('Diferentonas')

.directive('dfCommentCard',['$http', function($http) {
  return {
    restrict: 'E',
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
      var api = 'http://localhost:8100/api';
      if(!scope.comment.apoiada){
        //iniciativas/:iniciativa/opinioes/:opiniao/joinha
        $http.post(api.concat("/iniciativas/", scope.initiative.id, "/opinioes/"), scope.comment, {
          headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
          refreshComments();
        }).error(function(data) {
          ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
          //console.log(data);
        });
      }
    }
    }
  }
}]);
