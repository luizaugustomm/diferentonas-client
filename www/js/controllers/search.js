angular.module('Diferentonas')

.controller('SearchCtrl', ['$http', '$location', 'City', function($http, $location, City) {
  var vm = this;
  vm.cityInput = "";
  vm.cities = [];
  vm.isSearching = false;

  vm.startSearch = function() {
    vm.isSearching = true;
  }

  vm.selectCity = function(city) {
    vm.cityInput = city.nome + ' - ' + city.uf;
  };

  $http.get('js/cities.json').success(function(data) {
    vm.cities = data;
  });
}]);
