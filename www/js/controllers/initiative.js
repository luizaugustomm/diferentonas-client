angular.module('Diferentonas')

.controller('InitiativeCtrl', ['$stateParams', '$http','$ionicLoading', 'ionicToast','City', function($stateParams, $http,$ionicLoading, ionicToast,City) {
    var vm = this;
    vm.id = $stateParams.id_city;
    vm.theme = $stateParams.theme;
    vm.id_initiative = parseInt($stateParams.id_initiative);
    vm.city = City;
    vm.bomba = 0;
    vm.coracao = 0;
    vm.coracao_partido = 0;

    // vm.initiative = vm.city.iniciativas[vm.id_initiative];
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
          vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
          City.iniciativas = data;
      })
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
    }

    vm.followInitiative = function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      var api = 'http://diferentonas.herokuapp.com/iniciativas/';

      if (vm.initiative.seguidaPeloRequisitante) {
        $http.delete(api.concat(vm.id_initiative, "/inscritos"), vm.id_initiative, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = false;
            $ionicLoading.hide();
            ionicToast.show("Parou de seguir a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      } else {
        $http.post(api.concat(vm.id_initiative, "/inscritos"), vm.id_initiative, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = true;
            $ionicLoading.hide();
            ionicToast.show("Está seguindo a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      }
      console.log("Iniciativa #" + vm.id_initiative + " está sendo seguida? " + vm.initiative.seguidaPeloRequisitante);
    }


    if(vm.initiative.sumario.coracao_partido >= 1){
      vm.coracao_partido = vm.initiative.sumario.coracao_partido;
    }
    if(vm.initiative.sumario.coracao >= 1){
      vm.coracao = vm.initiative.sumario.coracao;
    }
    if(vm.initiative.sumario.bomba >= 1){
      vm.bomba = vm.initiative.sumario.bomba;
    }

    vm.data = [{key:"Analise de iniciativa",
              values: [{"label":"Bomba","value":vm.bomba,"color": "#5D5D5D"},
                      {"label":"Curti","value":vm.coracao,"color": "#5D5D5D"},
                      {"label":"Não curti","value":vm.coracao_partido,"color": "#5D5D5D"}]}];

    vm.options = {
      chart: {
        type: 'discreteBarChart',
          height: 200,
          x: function(d){return d.label;},
          y: function(d){return d.value;},
            showValues: true,
          interactive: false,
          stacked: false,
          xAxis: {showMaxMin: false},
          showYAxis:false,
          showXAxis:false,
          margin:{"left":5, "right":10, "top":40, "bottom":20}
        }
    };

}]);
