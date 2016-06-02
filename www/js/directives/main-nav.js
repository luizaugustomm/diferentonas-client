angular.module('Diferentonas')

.directive('dfMainNav', ['$http', function($http) {
  return {
    restrict: 'E',
    scope: {
      navClass: "="
    },
    templateUrl: 'templates/directives/main-nav.html'
  }
}]);
