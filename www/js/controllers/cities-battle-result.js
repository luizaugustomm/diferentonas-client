angular.module('Diferentonas')

.controller('CitiesBattleResultCtrl', ['$stateParams', '$http', 'City', function($stateParams, $http, City) {
  var vm = this;
  vm.first = null;
  vm.second = null;

  var api = 'http://diferentonas.herokuapp.com/cidade/';

  $http.get(api.concat($stateParams.id_first_city), {
      headers: {'Access-Control-Allow-Origin': '*'}
  }).success(function(data) {
      vm.first = data;
  })

  $http.get(api.concat($stateParams.id_second_city), {
      headers: {'Access-Control-Allow-Origin': '*'}
  }).success(function(data) {
      vm.second = data;
  })

  var results = {}
  for (var i = 0; i < 21; i++) {
    if (vm.first.scores[i].repasseTotal > vm.second.scores[i].repasseTotal) {
      results[vm.first.scores[i].area] = vm.getFirstCity();
    } else {
      results[vm.second.scores[i].area] = vm.getSecondCity();
    }
  }

  vm.winner = {}
  var firstScore = 0;
  var secondScore = 0;
  results.forEach(function(result) {
    if (result === vm.getFirstCity()) {
      firstScore++;
    } else {
      secondScore++;
    }
  });
  if (firstScore > secondScore) {
    vm.winner.nome = vm.first.nome;
    vm.winner.uf = vm.first.uf;
    vm.winner.battleScore = firstScore;
    vm.winner.class = 'first-city';
  } else {
    vm.winner.nome = vm.second.nome;
    vm.winner.uf = vm.second.uf;
    vm.winner.battleScore = secondScore;
    vm.winner.class = 'second-city';
  }

  vm.getFirstCity = function() {
    return vm.first.nome + ' - ' + vm.first.uf;
  }

  vm.getSecondCity = function() {
    return vm.second.nome + ' - ' + vm.second.uf;
  }

  vm.getWinner = function() {
    return vm.winner.nome + ' - ' + vm.winner.uf;
  }

  vm.getBattleScores = function() {
    return firstScore + ' x ' + secondScore;
  }

}]);
