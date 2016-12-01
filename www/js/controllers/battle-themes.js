angular.module('Diferentonas')

.controller('BattleThemesCtrl', ['$ionicHistory','ionicToast','$http', '$stateParams', '$ionicLoading', 'ApiEndpoint',  function($ionicHistory,ionicToast,$http, $stateParams, $ionicLoading, ApiEndpoint) {
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

      var totalGeralIndex = -1;
      for (i = 0; i < vm.firstCity.scores.length; i++) {
        if (vm.firstCity.scores[i].area === 'TOTAL GERAL')
          totalGeralIndex = i;
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

      // Removing total geral content
      if (totalGeralIndex != -1)
        vm.themes.splice(totalGeralIndex, 1);
    });
    $ionicLoading.hide();
  }).error(function(error){
      $ionicLoading.hide();
      ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
      vm.goBack();
  });

  vm.getFullCityName = function(city) {
    return city.nome + ' - ' + city.uf;
  }

  vm.getBattleStatus = function() {
    if (vm.firstCity.battleScore > vm.secondCity.battleScore) return 'won';
    if (vm.firstCity.battleScore < vm.secondCity.battleScore) return 'lost';
    else                                                      return 'tied';
  }

  vm.goBack = function() {
    $ionicHistory.goBack();
  }

}])
