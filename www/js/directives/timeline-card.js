angular.module('Diferentonas')

.directive('dfTimelineCard', function() {
  return {
    restrict: 'E',
    scope: {
      novidade: '='
    },
    templateUrl: 'templates/directives/timeline-card.html'
  }
});
