
angular.module('Diferentonas').factory('City', function() {
    return {
        'info': null,
        'similars': null,
        'convenios': null,
        'convFiltrados': null
    };
})

angular.module('Diferentonas').controller('CitySelectorController', function($scope, $http, City) {
    $scope.cityInput = "";
    $scope.selectedCity = null;
    $scope.isSelected = false;
    $scope.isInputSelected = false;

    $http.get('js/cities.json').success(function(data) {
        $scope.cities = data;
    });

    $scope.inputIsFocused = function() {
        $scope.isInputSelected = !$scope.isInputSelected;
    }

    $scope.selectCity = function(city) {
        $scope.cityInput = city.nome + ' - ' + city.uf;
        $scope.selectedCity = city;
        $scope.isSelected = !$scope.isSelected;
        $scope.cityCleared();
        $scope.citySearched(city);
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
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id).concat('/convenios'), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.convenios = data;
        })
        $scope.City = City;
        //$location.path('/cards');
    }

    $scope.cityCleared = function() {
        $scope.cityInput = '';
        $scope.selectedCity = null;
        $scope.isSelected = false;
        $scope.isInputSelected = false;
    }
})