angular.module('Diferentonas')

.directive('dfInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      iniciativa: '=',
      city: '='
    },
    templateUrl: 'templates/directives/initiative-card.html'
  }
});
