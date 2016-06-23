angular.module('Diferentonas')

.controller('CitiesBattleResultCtrl', ['$state', 'City', function($state, City) {
  var vm = this;
  vm.cities = [
    {'id': null, 'nome': '', 'uf': null},
    {'id': null, 'uf': null, 'nome': ''},
  ];

}])
