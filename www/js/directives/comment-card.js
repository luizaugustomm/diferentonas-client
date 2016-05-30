angular.module('Diferentonas')

.directive('dfCommentCard', function() {
  return {
    restrict: 'E',
    scope: {
      "city": "=",
      "score": "=",
      "initiative": "=",
      "comment": "="
    },
    templateUrl: 'templates/directives/comment-card.html'
  }
});
