angular.module('Diferentonas')

.controller('CityCtrl', ['$stateParams', '$http', '$ionicLoading', 'City', function($stateParams, $http, $ionicLoading, City) {

    var vm = this;
    vm.id = $stateParams.id_city;
    vm.city = City;
    vm.showNeutralThemes = false;

    vm.orderByScore = function(score) {
      if (score.area == "TOTAL GERAL" && vm.city.isNeutral(score)) {
        return 10;
      }
      return Math.abs(score.valorScore)*-1;
    }

    vm.toggleNeutralThemes = function() {
      vm.showNeutralThemes = !vm.showNeutralThemes;
    }

    vm.hasNeutralThemes = function() {
        var neutrals = 0;
        vm.city.info.scores.forEach(function(score) {
            if (vm.city.isNeutral(score))
                neutrals += 1;
        });
        return neutrals !== 0;
    }

    vm.hasDifferentThemes = function() {
        var diferentices = 0;
        vm.city.info.scores.forEach(function(score) {
            if (vm.city.isDifferent(score))
                diferentices += 1;
        });
        return diferentices !== 0;
    }

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
        vm.city.inicitivas = data;
        City.inicitivas = data;
        $ionicLoading.hide();
    }).error(function(data) {
        $ionicLoading.hide();
    })


}]);
