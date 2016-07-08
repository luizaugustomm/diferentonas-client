angular.module('Diferentonas')

.directive('dfNewInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '=',
      showcityname: '='
    },
    templateUrl: 'templates/directives/new-initiative-card.html'
  }
});
