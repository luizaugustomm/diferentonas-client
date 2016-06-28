angular.module('Diferentonas')

.directive('dfBattleCard', function() {
  return {
    restrict: 'E',
    scope: {
      theme: '=',
      icon: '=',
      resultText: '=',
      firstCityMoney: '=',
      secondCityMoney: '=',
      status: '='
    },
    templateUrl: 'templates/directives/battle-card.html'
  }
});
