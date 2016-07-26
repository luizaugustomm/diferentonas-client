angular.module('Diferentonas')

.directive('dfUpdatedScoreCard', function() {
  return {
    restrict: 'E',
    scope: {
      city: '=',
      score: '='
    },
    templateUrl: 'templates/directives/updated-score-card.html',
    link: function(scope, element, attrs) {
      scope.getScoreText = function(valorScore) {
        if (valorScore > -1 && valorScore < 1) {
          return "Recebeu dentro do esperado";
        } else {
          var x = valorScore;
          switch (true) {
            case (x < -2):
              return "Recebeu muito menos";
              break;
            case (x >= -2 && x < -1):
              return "Recebeu menos";
              break;
            case (x >= 1 && x < 2):
              return "Recebeu mais";
              break;
            default:
              return "Recebeu muito mais";
              break;
          }
        }
      }
    }
  }
});
