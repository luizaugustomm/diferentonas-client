angular.module('Diferentonas', ['ionic', 'ionic-toast','nvd3', 'ngResource'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            TestFairy.begin('c5a6698ec054a327018a8ceddde9fa3997317e12');
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
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
      .state('timeline', {
        url: '/timeline',
        templateUrl: 'templates/timeline.html',
        controller: 'TimelineCtrl',
        controllerAs: 'Timeline'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html'
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl',
        controllerAs: 'Messages'
      })
      .state('city', {
        url: '/city/:id',
        templateUrl: 'templates/city.html',
        controller: 'CityCtrl',
        controllerAs: 'City'
      })
      .state('themes', {
        url: '/themes/:id/:theme',
        templateUrl: 'templates/themes.html',
        controller: 'ThemesCtrl',
        controllerAs: 'Themes'
      })
      .state('initiative', {
        url: '/initiative/:id/:id_city',
        templateUrl: 'templates/initiative.html',
        controller: 'InitiativeCtrl',
        controllerAs: 'Initiative'
      })
      .state('initiative-similar', {
        url: '/initiative-similar/:id_city/:theme/:id_initiative',
        templateUrl: 'templates/initiative-similar.html',
        controller: 'InitiativeSimilarCtrl',
        controllerAs: 'Similar'
      })
      .state('initiative-comments', {
        url: '/initiative-comments/:id_city/:theme/:id_initiative',
        templateUrl: 'templates/initiative-comments.html',
        controller: 'InitiativeCommentsCtrl',
        controllerAs: 'Comments'
      })
      .state('initiative-replies', {
        url: '/initiative-replies/:id_city/:theme/:id_initiative',
        templateUrl: 'templates/initiative-replies.html',
        controller: 'InitiativeRepliesCtrl',
        controllerAs: 'Replies'
      })
      .state('broadcast', {
        url: '/broadcast',
        templateUrl: 'templates/broadcast.html',
        controller: 'BroadcastCtrl',
        controllerAs: 'Broadcast'
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
