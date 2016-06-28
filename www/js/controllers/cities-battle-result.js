angular.module('Diferentonas')

.controller('CitiesBattleResultCtrl', ['$http', '$stateParams', '$ionicLoading', function($http, $stateParams, $ionicLoading) {
  $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });

  var vm = this;
  vm.firstCity = {};
  vm.secondCity = {};
  vm.themes = {};

  $http.get('http://diferentonas.herokuapp.com/cidade/'.concat($stateParams.id_first_city),
  {headers: {'Access-Control-Allow-Origin': '*'}}).success(function(data) {
    vm.firstCity = data;
    vm.firstCity.battleScore = 0;

    $http.get('http://diferentonas.herokuapp.com/cidade/'.concat($stateParams.id_second_city),
    {headers: {'Access-Control-Allow-Origin': '*'}}).success(function(data) {
      vm.secondCity = data;
      vm.secondCity.battleScore = 0;

      for (i = 0; i < vm.firstCity.scores.length; i++) {
        if (vm.firstCity.scores[i].area === 'TOTAL GERAL')  continue;
        vm.themes[vm.firstCity.scores[i].area] = {
          firstCityMoney: vm.firstCity.scores[i].repasseTotal,
          secondCityMoney: vm.secondCity.scores[i].repasseTotal
        }
        if (vm.firstCity.scores[i].repasseTotal > vm.secondCity.scores[i].repasseTotal) {
          vm.firstCity.battleScore++;
          vm.themes[vm.firstCity.scores[i].area].status = 'won';
        } else if (vm.firstCity.scores[i].repasseTotal < vm.secondCity.scores[i].repasseTotal) {
          vm.secondCity.battleScore++;
          vm.themes[vm.firstCity.scores[i].area].status = 'lost';
        } else {
          vm.themes[vm.firstCity.scores[i].area].status = 'tied';
        }
      }
        console.log(vm.themes);
        console.log(vm.firstCity);
        console.log(vm.secondCity);
    });
  });

  $ionicLoading.hide();
}])
