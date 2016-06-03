angular.module('Diferentonas')

.controller('SearchCtrl', ['$http', '$location', '$ionicLoading', 'City', function($http, $location, $ionicLoading, City) {
  var vm = this;
  vm.cityInput = "";
  vm.cities = [];
  vm.isSearching = false;

  vm.startSearch = function() {
    vm.isSearching = true;
  }

  vm.selectCity = function(city) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    vm.cityInput = city.nome + ' - ' + city.uf;
  };

  $http.get('js/cities.json').success(function(data) {
    vm.cities = data;
  });
}]);
