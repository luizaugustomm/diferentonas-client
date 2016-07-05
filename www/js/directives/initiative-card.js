angular.module('Diferentonas')

.directive('dfInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      initiative: '=',
      city: '='
    },
    templateUrl: 'templates/directives/initiative-card.html'
  }
});
