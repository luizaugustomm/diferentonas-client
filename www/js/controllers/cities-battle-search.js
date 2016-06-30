angular.module('Diferentonas')

.controller('CitiesBattleSearchCtrl', ['$state', '$http', 'City', function($state, $http, City) {
  var vm = this;
  vm.cities = [];

  $http.get('js/cities.json').success(function(data) {
    vm.cities = data;
  });

  vm.clearFields= function() {
    vm.selectedCities = [
      {'id': null, 'nome': '', 'uf': '', 'isSelected': false},
      {'id': null, 'nome': '', 'uf': '', 'isSelected': false}
    ];
  }

  vm.selectedCities = null;
  vm.clearFields();

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

  vm.isReady = function() {
    return (vm.selectedCities[0].id !== null && vm.selectedCities[1].id);
  }

  vm.fight = function() {
    $state.go('cities-battle-result', {'id_first_city': vm.selectedCities[0].id,
                                       'id_second_city': vm.selectedCities[1].id});
    vm.clearFields();
  }
}]);
