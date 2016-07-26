angular.module('Diferentonas')

.directive('dfBattleCard', function() {
  return {
    restrict: 'E',
    scope: {
      firstcity: '=',
      secondcity: '=',
      theme: '=',
      firstcitymoney: '=',
      secondcitymoney: '=',
      status: '='
    },
    templateUrl: 'templates/directives/battle-card.html'
  }
});
