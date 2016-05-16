//Main class for the app
//Loads the frist screen

var login = angular.module('Diferentonas', ['ionic'])


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
    .state('login', {url: '/login',templateUrl: 'templates/login.html'})
    .state('home', {url: '/search',templateUrl: 'templates/search.html'})
    .state('cards', {url: '/cards',templateUrl: 'templates/cards.html'})
    $urlRouterProvider.otherwise('/login');
})

login.controller('LoginCtrl', function($scope,$location) {
    $scope.data = {};
 
    $scope.login = function() {
        //Insert the function for authenticate the user
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $location.path("/search");
    }
})