angular.module('Diferentonas')

.directive('dfMessageCard', ['$http', 'ApiEndpoint', function($http, ApiEndpoint) {
  return {
    restrict: 'E',
    scope: {
      message: '=',
      canDelete: '='
    },
    templateUrl: 'templates/directives/message-card.html',
    link: function(scope, element, attrs) {
      scope.delete = function(id) {
        var api = ApiEndpoint.url + '/mensagens';
        $http.delete(api.concat('/'+id)).success(function(data, status) {
          element.remove();
        })
      }
    }
  }
}]);
