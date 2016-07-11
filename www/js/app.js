
angular.module('Diferentonas', ['ionic', 'ionic-toast','nvd3','ngCordova', 'ngResource', 'ngCordovaOauth' ])

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
  .state('broadcast', {
    url: '/broadcast',
    templateUrl: 'templates/broadcast.html',
    controller: 'BroadcastCtrl',
    controllerAs: 'Broadcast'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'Search'
  })
  .state('city-themes', {
    url: '/city/:id_city/themes',
    templateUrl: 'templates/city-themes.html',
    controller: 'CityThemesCtrl',
    controllerAs: 'CityThemes'
  })
  .state('city-similars', {
    url: '/city/:id_city/similars',
    templateUrl: 'templates/city-similars.html',
    controller: 'CitySimilarsCtrl',
    controllerAs: 'CitySimilars'
  })
  .state('city-news', {
    url: '/city/:id_city/news',
    templateUrl: 'templates/city-news.html',
    controller: 'CityNewsCtrl',
    controllerAs: 'CityNews'
  })
  .state('battle', {
    url: '/battle',
    templateUrl: 'templates/battle.html',
    controller: 'BattleCtrl',
    controllerAs: 'Battle'
  })
  .state('battle-themes', {
    url: '/battle/:id_first_city&:id_second_city/themes',
    templateUrl: 'templates/battle-themes.html',
    controller: 'BattleThemesCtrl',
    controllerAs: 'BattleThemes'
  })
  .state('initiatives', {
    url: '/city/:id_city/:theme/initiatives',
    templateUrl: 'templates/initiatives.html',
    controller: 'InitiativesCtrl',
    controllerAs: 'Initiatives'
  })
  .state('initiative-info', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/info',
    templateUrl: 'templates/initiative-info.html',
    controller: 'InitiativeInfoCtrl',
    controllerAs: 'InitiativeInfo'
  })
  .state('initiative-similars', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/similars',
    templateUrl: 'templates/initiative-similars.html',
    controller: 'InitiativeSimilarsCtrl',
    controllerAs: 'InitiativeSimilars'
  })
  .state('initiative-comments', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/comments',
    templateUrl: 'templates/initiative-comments.html',
    controller: 'InitiativeCommentsCtrl',
    controllerAs: 'InitiativeComments'
  })
  .state('initiative-replies', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/replies',
    templateUrl: 'templates/initiative-replies.html',
    controller: 'InitiativeRepliesCtrl',
    controllerAs: 'InitiativeReplies'
  });
  $urlRouterProvider.otherwise('/login');
})
