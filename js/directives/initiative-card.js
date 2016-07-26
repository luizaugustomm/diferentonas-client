angular.module('Diferentonas')

.directive('dfInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '='
    },
    templateUrl: 'templates/directives/initiative-card.html'
  }
});
