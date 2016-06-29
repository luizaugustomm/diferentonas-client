angular.module('Diferentonas')

.directive('dfThemeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      score: '=',
      scoreText: '=',
      baseColor: '='
    },
    templateUrl: 'templates/directives/theme-card.html'
  }
});
