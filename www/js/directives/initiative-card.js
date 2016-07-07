angular.module('Diferentonas')

.directive('dfInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '=',
      updatestatus: '=',
      hascomment: '='
    },
    templateUrl: 'templates/directives/initiative-card.html'
  }
});
