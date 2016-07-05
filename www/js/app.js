
angular.module('Diferentonas', ['ionic', 'ionic-toast','nvd3','ngCordova', 'ngResource'])

.constant('ApiEndpoint', {
// usar 'gulp deploy-emulator' quando for gerar aplicativo (apk, ipa) ou testar com emulador
// usar 'gulp deploy-ionic-serve' quando for executar com ionic serve
// usar 'gulp deploy' para fazer upload no github io
  url: 'http://localhost:8100/api'
})

.run(function($ionicPlatform,UserService,$state) {
    $ionicPlatform.ready(function() {
        if( UserService.getUser() != null){
          $state.go('search');
        }
        facebookConnectPlugin.browserInit("1168526739834367");
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(true);
            cordova.plugins.TestFairy.begin('c5a6698ec054a327018a8ceddde9fa3997317e12');
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'Login'
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
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'Profile'
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
      .state('city-similar', {
        url: '/city-similar/:id',
        templateUrl: 'templates/city-similar.html',
        controller: 'CitySimilarCtrl',
        controllerAs: 'CitySimilar'
      })
      .state('themes', {
        url: '/themes/:id/:theme',
        templateUrl: 'templates/themes.html',
        controller: 'ThemesCtrl',
        controllerAs: 'Themes'
      })
      .state('initiative', {
        url: '/initiative/:id/:id_city/:theme',
        templateUrl: 'templates/initiative.html',
        controller: 'InitiativeCtrl',
        controllerAs: 'Initiative'
      })
      .state('initiative-similar', {
        url: '/initiative-similar/:id/:id_city/:theme',
        templateUrl: 'templates/initiative-similar.html',
        controller: 'InitiativeSimilarCtrl',
        controllerAs: 'Similar'
      })
      .state('initiative-comments', {
        url: '/initiative-comments/:id/:id_city/:theme',
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
      .state('cities-battle-search', {
        url: '/cities-battle-search',
        templateUrl: 'templates/cities-battle-search.html',
        controller: 'CitiesBattleSearchCtrl',
        controllerAs: 'CitiesBattleSearch'
      })
      .state('cities-battle-result', {
        url: '/cities-battle-result/:id_first_city&:id_second_city',
        templateUrl: 'templates/cities-battle-result.html',
        controller: 'CitiesBattleResultCtrl',
        controllerAs: 'CitiesBattleResult'
      });
    $urlRouterProvider.otherwise('/login');
})
