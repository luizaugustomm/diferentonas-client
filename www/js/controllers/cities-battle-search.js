angular.module('Diferentonas')

.controller('CitiesBattleSearchCtrl', ['$state', '$http', 'City', function($state, $http, City) {
  var vm = this;
  // vm.cities = City.getCities();

  $http.get('js/cities.json').success(function(data) {
    vm.cities = data;
  });

  vm.selectedCities = [
    {'id': null, 'nome': '', 'uf': '', 'isSelected': false},
    {'id': null, 'nome': '', 'uf': '', 'isSelected': false}
  ];

  vm.selectCity = function(city, which) {
    if (which >= 0 && which < 2) {
      vm.selectedCities[which].id = city.id;
      vm.selectedCities[which].nome = city.nome;
      vm.selectedCities[which].uf = city.uf;
      vm.selectedCities[which].isSelected = true;
    }
  }

  vm.inputChanged = function(which) {
    vm.selectedCities[which].isSelected = false;
  }

  vm.fight = function() {
    $state.go('cities-battle-result', {'id_first_city': vm.selectedCities[0].id,
                                       'id_second_city': vm.selectedCities[1].id});
  }
}])
