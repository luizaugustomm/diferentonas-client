angular.module('Diferentonas', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'Search'
      })
      .state('city', {
        url: '/city/:id_city',
        templateUrl: 'templates/city.html',
        controller: 'CityCtrl',
        controllerAs: 'City'
      })
      .state('themes', {
        url: '/themes/:id_city/:score',
        templateUrl: 'templates/themes.html',
        controller: 'ThemesCtrl',
        controllerAs: 'Themes'
      })
      .state('initiative', {
        url: '/initiative/:id_city/:score/:id_initiative',
        templateUrl: 'templates/initiative.html',
        controller: 'InitiativeCtrl',
        controllerAs: 'Initiative'
      })
      .state('initiative-comments', {
        url: '/initiative-comments/:id_city/:score/:id_initiative',
        templateUrl: 'templates/initiative-comments.html',
        controller: 'InitiativeCommentsCtrl',
        controllerAs: 'Comments'
      })
      .state('initiative-replies', {
        url: '/initiative-replies/:id_city/:score/:id_initiative',
        templateUrl: 'templates/initiative-replies.html',
        controller: 'InitiativeRepliesCtrl',
        controllerAs: 'Replies'
      })
    $urlRouterProvider.otherwise('/login');
})

.controller('LoginCtrl', function($scope,$location) {
    $scope.data = {};

    $scope.login = function() {
        //Insert the function for authenticate the user
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $location.path("/search");
    }
})
