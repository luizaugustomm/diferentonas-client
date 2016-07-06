angular.module('Diferentonas')

.directive('dfInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      initiative: '=',
      city: '=',
      isnew: '='
    },
    templateUrl: 'templates/directives/initiative-card.html'
  }
});
