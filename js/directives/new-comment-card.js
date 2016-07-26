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
            return "ion-heart";
            break;
          case "coracao_partido":
            return "ion-heart-broken";
            break;
          case "bomba":
            return "ion-flame";
            break;
          default:
            return "ion-minus"
            break;
        }
      }
    }
  }
});
