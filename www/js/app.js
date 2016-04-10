// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Diferentonas', ['ionic'])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'templates/home.html',
    })
    .state('cards', {
        url: '/cards',
        templateUrl: 'templates/cards.html',
        controller: 'CardsController'
    })
    $urlRouterProvider.otherwise('/');
})

.factory('City', function() {
    return {
        'info': null,
        'similars': null
    };
})


.controller('CitySelectorController', function($scope, $http, $location, City) {
    $scope.cityInput = "";
    $scope.selectedCity = null;
    $scope.isSelected = false;

    $http.get('js/cities.json').success(function(data) {
        $scope.cities = data;
    });

    $scope.selectCity = function(city) {
        $scope.cityInput = city.nome;
        $scope.selectedCity = city;
        $scope.isSelected = !$scope.isSelected;
    };

    $scope.citySearched = function(city) {
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.info = data;
        })
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id).concat('/similares'), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.similars = data;
        })
        $scope.City = City;
        $location.path("/cards");
    }

    $scope.cityCleared = function() {
        $scope.cityInput = "";
        $scope.selectedCity = null;
        $scope.isSelected = false;
    }
})


.controller('CardsController', function($scope, $location, City) {

    $scope.City = City;

    $scope.cards = [
        {"topic": "Saúde", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales facilisis nulla nec faucibus. Nunc sed fringilla nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla a arcu ornare, sodales nulla eu, dignissim nunc. Phasellus vulputate eros in elit malesuada tempus. Praesent tempus velit a arcu accumsan, id pellentesque ipsum ornare. Proin mi massa, egestas nec nisl sit amet, varius pulvinar quam."},
        {"topic": "Educação", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales facilisis nulla nec faucibus. Nunc sed fringilla nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla a arcu ornare, sodales nulla eu, dignissim nunc. Phasellus vulputate eros in elit malesuada tempus. Praesent tempus velit a arcu accumsan, id pellentesque ipsum ornare. Proin mi massa, egestas nec nisl sit amet, varius pulvinar quam."},
        {"topic": "Transporte", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales facilisis nulla nec faucibus. Nunc sed fringilla nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla a arcu ornare, sodales nulla eu, dignissim nunc. Phasellus vulputate eros in elit malesuada tempus. Praesent tempus velit a arcu accumsan, id pellentesque ipsum ornare. Proin mi massa, egestas nec nisl sit amet, varius pulvinar quam."},
        {"topic": "Moradia", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales facilisis nulla nec faucibus. Nunc sed fringilla nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla a arcu ornare, sodales nulla eu, dignissim nunc. Phasellus vulputate eros in elit malesuada tempus. Praesent tempus velit a arcu accumsan, id pellentesque ipsum ornare. Proin mi massa, egestas nec nisl sit amet, varius pulvinar quam."}
    ];

    $scope.toggleCard = function(card) {
        if ($scope.isCardShown(card)) {
            $scope.shownCard = null;
        } else {
            $scope.shownCard = card;
        }
    };

    $scope.isCardShown = function(card) {
        return $scope.shownCard === card;
    }

    $scope.returnClicked = function() {
        $location.path("/");
    }
});
