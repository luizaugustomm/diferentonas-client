angular.module('Diferentonas')

.controller('InitiativeInfoCtrl', ['$state','$ionicHistory', '$stateParams', '$http','$ionicLoading', 'ionicToast', 'City', 'Initiative', 'ApiEndpoint', function($state,$ionicHistory, $stateParams, $http,$ionicLoading, ionicToast, City, Initiative, ApiEndpoint) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.theme = $stateParams.theme;

    var setSumario = function(sumario) {
      vm.data = [{key:"Analise de iniciativa",
                values: [{"label":"Bomba","value":sumario.bomba,"color": "#5D5D5D"},
                        {"label":"Curti","value":sumario.coracao,"color": "#5D5D5D"},
                        {"label":"Não curti","value":sumario.coracao_partido,"color": "#5D5D5D"}]}];

      console.log(sumario);

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

    vm.initiative = Initiative.get({id: $stateParams.id_initiative}, function() {
      // TODO issue #54 Remover essa chamada quando o objeto cidade já estiver incluso na iniciativa
      vm.initiative.city = City.get({id: $stateParams.id_city}, function() {
        vm.initiative.statusClass = City.getInitiativeStatus(vm.initiative);
        vm.initiative.icone = getIconArea(vm.initiative.area);
      });
      if (vm.initiative.sumario !== null) {
        setSumario(vm.initiative.sumario);
      }
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      if(error.status === 500){
        ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
        $ionicHistory.goBack();
      }
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

    getIconArea = function(area) {
      switch (area) {
        case "Administração": return "administracao"; break;
        case "Agricultura": return "agricultura"; break;
        case "Assitência Social": return "assistencia_social"; break;
        case "Ciência e Tecnologia": return "ciencia_e_tecnologia"; break;
        case "Comércio e Serviços": return "comercio"; break;
        case "Comunicações": return "comunicacoes"; break;
        case "Cultura": return "cultura"; break;
        case "Defesa Nacional": return "defesa_nacional"; break;
        case "Disporto e Lazer": return "desporto_e_lazer"; break;
        case "Direitos da Cidadania": return "direitos_da_cidadania"; break;
        case "Educação": return "educacao"; break;
        case "Energia": return "energia"; break;
        case "Gestão Ambiental": return "gestao_ambiental"; break;
        case "Indústria": return "industria"; break;
        case "Organização Agrária": return "organizacao_agraria"; break;
        case "Saneamento": return "saneamento"; break;
        case "Saúde": return "saude"; break;
        case "Segurança": return "seguranca"; break;
        case "Trabalho": return "trabalho"; break;
        case "Transporte": return "transporte"; break;
        case "Urbanismo": return "urbanismo"; break;

        default:
          return "batalha"
          break;
      }
    }

}]);
