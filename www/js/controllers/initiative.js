angular.module('Diferentonas')

.controller('InitiativeCtrl', ['$ionicHistory', '$stateParams', '$http','$ionicLoading', 'ionicToast', 'City', 'Initiative', 'ApiEndpoint', function($ionicHistory, $stateParams, $http,$ionicLoading, ionicToast, City, Initiative, ApiEndpoint) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.theme = $stateParams.theme;

    var setSumario = function(sumario) {
      vm.data = [{key:"Analise de iniciativa",
                values: [{"label":"Bomba","value":sumario.bomba,"color": "#5D5D5D"},
                        {"label":"Curti","value":sumario.coracao,"color": "#5D5D5D"},
                        {"label":"Não curti","value":sumario.coracao_partido,"color": "#5D5D5D"}]}];
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
            margin:{"left":5, "right":10, "top":40, "bottom":20},
            valueFormat: function(d){ return d3.format('d')(d) }
          }
      };
    }

    vm.initiative = Initiative.get({id: $stateParams.id}, function() {
      // TODO issue #54 Remover essa chamada quando o objeto cidade já estiver incluso na iniciativa
      vm.initiative.city = City.get({id: $stateParams.id_city});
      if (vm.initiative.sumario !== null) {
        setSumario(vm.initiative.sumario);
      }
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
    });

    vm.followInitiative = function() {
      //adicionar chamada que faz o check do usuário seguir a iniciativa
      var api = ApiEndpoint.url + '/iniciativas/';

      if (vm.initiative.seguidaPeloRequisitante) {
        $http.delete(api.concat(vm.initiative.id, "/inscritos"), vm.initiative.id, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.initiative.seguidaPeloRequisitante = false;
            $ionicLoading.hide();
            ionicToast.show("Parou de seguir a iniciativa!", 'bottom', false, 2500);
            })
          .error(function(data) {
            $ionicLoading.hide();
            console.log(data);
            ionicToast.show("Algo deu errado.", 'bottom', false, 2500);
        });
      } else {
        $http.post(api.concat(vm.initiative.id, "/inscritos"), vm.initiative.id, {
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
      console.log("Iniciativa #" + vm.initiative.id + " está sendo seguida? " + vm.initiative.seguidaPeloRequisitante);
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

}]);
