angular.module('Diferentonas')

.controller('SearchCtrl', ['$http', '$state', '$filter', 'City', function($http, $state, $filter, City) {
  var vm = this;
  vm.cityInput = "";
  vm.cities = [];
  vm.selectedCity = {
    "id": null,
    "uf": null,
    "nome": ""
  };
  vm.isSearching = false;

  vm.startSearch = function() {
    vm.isSearching = true;
  }
  vm.selectCity = function(city) {
    vm.selectedCity = {
      "id": city.id,
      "uf": city.uf,
      "nome": city.nome
    };
  };
  vm.search = function() {
    var city = $filter('filter')(vm.cities, vm.selectedCity.nome)[0];
    vm.selectCity(city);
    $state.go('city', {'id_city': vm.selectedCity.id});
  }

  $http.get('js/cities.json').success(function(data) {
    vm.cities = data;
  });
}]);
