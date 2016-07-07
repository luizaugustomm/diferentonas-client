angular.module('Diferentonas')

.directive('dfUpdatedScoreCard', function() {
  return {
    restrict: 'E',
    scope: {
      score: '=',
      city: '='
    },
    templateUrl: 'templates/directives/theme-card.html'
  }
});
