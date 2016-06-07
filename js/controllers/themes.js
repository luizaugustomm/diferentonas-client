angular.module('Diferentonas')

.controller('ThemesCtrl', ['$stateParams', '$http', 'City', function($stateParams, $http, City) {
    var vm = this;
    vm.id = $stateParams.id_city;
    vm.score = $stateParams.score;
    vm.city = City;
    if (!vm.city.hasData()) {
      var api = 'http://diferentonas.herokuapp.com/cidade/';
      // var api = 'http://0.0.0.0:9000/cidade/';
      $http.get(api.concat(vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      })
      $http.get(api.concat(vm.id).concat('/similares'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      })
      $http.get(api.concat(vm.id).concat('/iniciativas'), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.iniciativas = data;
          City.iniciativas = data;
      })
    }

    vm.hasInitiatives = function(area) {
        has = false;
        vm.city.info.scores.forEach(function(score) {
            if (score.area === area && score.repasseTotal !== 0) {
                has = true;
                return;
            }
        });
        return has;
    }
}]);
