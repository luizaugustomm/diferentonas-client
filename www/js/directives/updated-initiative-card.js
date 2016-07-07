angular.module('Diferentonas')

.directive('dfUpdatedInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      initiative: '='
    },
    templateUrl: 'templates/directives/updated-initiative-card.html'
  }
});
