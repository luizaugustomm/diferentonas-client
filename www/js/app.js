
angular.module('Diferentonas', ['ionic', 'ionic-toast', 'nvd3', 'ngCordova', 'ngResource', 'satellizer' ])

.constant('ApiEndpoint', {
// usar 'gulp deploy-emulator' quando for gerar aplicativo (apk, ipa) ou testar com emulador
// usar 'gulp deploy-ionic-serve' quando for executar com ionic serve
// usar 'gulp deploy' para fazer upload no github io
  // url: 'http://diferentonas.nuvem.gov.br/api'
  url: 'http://diferentonas.nuvem.gov.br/api'
})

.run(function($ionicPlatform,UserService,$state) {
  $ionicPlatform.ready(function() {
    // if( UserService.getUser() != null){
    //   $state.go('search');
    // }
    // facebookConnectPlugin.browserInit("1168526739834367");
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $authProvider, ApiEndpoint) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'Login'
  })
  .state('timeline', {
    cache: false,
    url: '/timeline',
    templateUrl: 'templates/timeline.html',
    controller: 'TimelineCtrl',
    controllerAs: 'Timeline',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'Profile',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('help', {
    url: '/help',
    templateUrl: 'templates/help.html',
    controller: 'HelpCtrl',
    controllerAs: 'Help'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'About'
  })
  .state('messages', {
    cache: false,
    url: '/messages',
    templateUrl: 'templates/messages.html',
    controller: 'MessagesCtrl',
    controllerAs: 'Messages',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'Search',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('city-themes', {
    url: '/city/:id_city/themes',
    templateUrl: 'templates/city-themes.html',
    controller: 'CityThemesCtrl',
    controllerAs: 'CityThemes',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('city-similars', {
    url: '/city/:id_city/similars',
    templateUrl: 'templates/city-similars.html',
    controller: 'CitySimilarsCtrl',
    controllerAs: 'CitySimilars',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('city-news', {
    cache: false,
    url: '/city/:id_city/news',
    templateUrl: 'templates/city-news.html',
    controller: 'CityNewsCtrl',
    controllerAs: 'CityNews',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('battle', {
    url: '/battle',
    templateUrl: 'templates/battle.html',
    controller: 'BattleCtrl',
    controllerAs: 'Battle',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('battle-themes', {
    url: '/battle/:id_first_city&:id_second_city/themes',
    templateUrl: 'templates/battle-themes.html',
    controller: 'BattleThemesCtrl',
    controllerAs: 'BattleThemes',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('initiatives', {
    url: '/city/:id_city/:theme/initiatives',
    templateUrl: 'templates/initiatives.html',
    controller: 'InitiativesCtrl',
    controllerAs: 'Initiatives',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('initiative-info', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/info',
    templateUrl: 'templates/initiative-info.html',
    controller: 'InitiativeInfoCtrl',
    controllerAs: 'InitiativeInfo',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('initiative-similars', {
    url: '/city/:id_city/:theme/initiative/:id_initiative/similars',
    templateUrl: 'templates/initiative-similars.html',
    controller: 'InitiativeSimilarsCtrl',
    controllerAs: 'InitiativeSimilars',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('initiative-comments', {
    cache: false,
    url: '/city/:id_city/:theme/initiative/:id_initiative/comments',
    templateUrl: 'templates/initiative-comments.html',
    controller: 'InitiativeCommentsCtrl',
    controllerAs: 'InitiativeComments',
    resolve: {
      loginRequired: loginRequired
    }
  });

  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'yes',
      width: window.screen.width,
      height: window.screen.height
    }
  };

  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    $authProvider.cordova = true;
    // $authProvider.platform = 'mobile';
    commonConfig.redirectUri = 'http://localhost/';
    console.log("is a mobile!!!");
  }

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '1168526739834367',
    url: ApiEndpoint.url +'/cidadao/auth/facebook'
  }));

  $authProvider.google(angular.extend({}, commonConfig, {
    clientId: '1061066859155-tngvmfeld8800lq6rmuu9dmq15301ucl.apps.googleusercontent.com',
    url: ApiEndpoint.url +'/cidadao/auth/google'
  }));

  $urlRouterProvider.otherwise('/login');

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

  function adminLoginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

})
