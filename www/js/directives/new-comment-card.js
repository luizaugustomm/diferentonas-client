angular.module('Diferentonas')

.directive('dfNewCommentCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '=',
      comment: '=',
      showcityname: '='
    },
    templateUrl: 'templates/directives/new-comment-card.html',
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
    }
  }
});
