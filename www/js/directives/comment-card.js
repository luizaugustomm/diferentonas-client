angular.module('Diferentonas')

.directive('dfCommentCard', function() {
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
