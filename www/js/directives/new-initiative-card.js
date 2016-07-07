angular.module('Diferentonas')

.directive('dfNewInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '='
    },
    templateUrl: 'templates/directives/new-initiative-card.html'
  }
});
