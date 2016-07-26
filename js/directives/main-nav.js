angular.module('Diferentonas')

.directive('dfMainNav', ['$http', function($http) {
  return {
    restrict: 'E',
    scope: {
      navClass: "="
    },
    templateUrl: 'templates/directives/main-nav.html'
  }
}])

.directive('dfScrollTo', ['$ionicScrollDelegate', function($ionicScrollDelegate) {
  return {
    link: function (scope, element, attrs) {
      element.on('click', function (event) {
        $ionicScrollDelegate.scrollTo(0, element[0].offsetTop, true);
      });
    }
  };
}])

.directive('dfScrollToTop', ['$ionicScrollDelegate', function($ionicScrollDelegate) {
  return {
    link: function (scope, element, attrs) {
      element.on('click', function (event) {
        $ionicScrollDelegate.scrollTop(true);
      });
    }
  };
}]);
