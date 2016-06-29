angular.module('Diferentonas')

.controller('CitiesBattleResultCtrl', ['$http', '$stateParams', '$ionicLoading', '$filter', 'ApiEndpoint',  function($http, $stateParams, $ionicLoading, $filter, ApiEndpoint) {
  $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
  var vm = this;
  vm.firstCity = {};
  vm.secondCity = {};
  vm.themes = [];

  $http.get(ApiEndpoint.url + '/cidade/'.concat($stateParams.id_first_city),
  {headers: {'Access-Control-Allow-Origin': '*'}}).success(function(data) {
    vm.firstCity = data;
    vm.firstCity.battleScore = 0;

    $http.get(ApiEndpoint.url + '/cidade/'.concat($stateParams.id_second_city),
    {headers: {'Access-Control-Allow-Origin': '*'}}).success(function(data) {
      vm.secondCity = data;
      vm.secondCity.battleScore = 0;

      for (i = 0; i < vm.firstCity.scores.length; i++) {
        if (vm.firstCity.scores[i].area === 'TOTAL GERAL')  continue;
        vm.themes[i] = {
          nome: vm.firstCity.scores[i].area,
          firstCityMoney: vm.firstCity.scores[i].repasseTotal,
          secondCityMoney: vm.secondCity.scores[i].repasseTotal
        }
        if (vm.firstCity.scores[i].repasseTotal > vm.secondCity.scores[i].repasseTotal) {
          vm.firstCity.battleScore++;
          vm.themes[i].status = 'won';
        } else if (vm.firstCity.scores[i].repasseTotal < vm.secondCity.scores[i].repasseTotal) {
          vm.secondCity.battleScore++;
          vm.themes[i].status = 'lost';
        } else {
          vm.themes[i].status = 'tied';
        }
      }
    });
    $ionicLoading.hide();
  });

  vm.getFullCityName = function(city) {
    return city.nome + ' - ' + city.uf;
  }

  vm.getBattleStatus = function() {
    if (vm.firstCity.battleScore > vm.secondCity.battleScore) return 'won';
    if (vm.firstCity.battleScore < vm.secondCity.battleScore) return 'lost';
    else                                                      return 'tied';
  }

  vm.getDetails = function(theme) {
    if (theme.status === 'won') {
      return vm.getFullCityName(vm.firstCity) + ' ganhou de ' + vm.getFullCityName(vm.secondCity) + ' por ' + $filter('formatCurrency')(theme.firstCityMoney - theme.secondCityMoney);
    } else if (theme.status === 'lost') {
      return vm.getFullCityName(vm.secondCity) + ' ganhou de ' + vm.getFullCityName(vm.firstCity) + ' por ' + $filter('formatCurrency')(theme.secondCityMoney - theme.firstCityMoney);
    } else {
      return 'As cidades empataram nesta área';
    }
  }
}])
