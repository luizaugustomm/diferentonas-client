angular.module('Diferentonas')

.directive('dfMessageCard', ['$http', function($http) {
  return {
    restrict: 'E',
    scope: {
      message: '=',
      canDelete: '='
    },
    templateUrl: 'templates/directives/message-card.html',
    link: function(scope, element, attrs) {
      scope.delete = function(id) {
        var api = 'http://diferentonas.herokuapp.com/mensagens';
        $http.delete(api.concat('/'+id)).success(function(data, status) {
          element.remove();
        })
      }
    }
  }
}]);
