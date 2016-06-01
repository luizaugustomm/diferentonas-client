angular.module('Diferentonas')

.directive('dfThemeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      score: '=',
      baseColor: '='
    },
    templateUrl: 'templates/directives/theme-card.html'
  }
});
