angular.module('Diferentonas')

.directive('dfBattleCard', function() {
  return {
    restrict: 'E',
    scope: {
      details: '=',
      theme: '=',
      firstcitymoney: '=',
      secondcitymoney: '=',
      status: '='
    },
    templateUrl: 'templates/directives/battle-card.html'
  }
});
