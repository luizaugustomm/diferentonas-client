angular.module('Diferentonas')

.directive('dfUpdatedScoreCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      score: '='
    },
    templateUrl: 'templates/directives/updated-score-card.html'
  }
});
