angular.module('Diferentonas')

.controller('TimelineCtrl', ['$scope','$http', 'City', function($scope,$http, City) {
    var vm = this;
    var api = "http://diferentonas.herokuapp.com";
    vm.city = City;
    $scope.moreData=false;
    vm.initiatives = [
      {
      id: 817260,
      ano: 2015,
      titulo: "Estruturacao da Rede de Servicos de Protecao Social Basica ¿ Aquisicao de Bens",
      programa: "Estruturacao da Rede Servicos de Protecao Social Basica - Emendas Parlamentares",
      area: "Assistência Social",
      fonte: "Ministerio do Desenv. Social e Combate a Fome",
      concedente: "Ministerio do Desenv. Social e Combate a Fome",
      status: "Não informado",
      temAditivo: false,
      verbaGovernoFederal: 100000,
      verbaMunicipio: 1644,
      dataInicio: "01/01/2015",
      dataConclusaoMunicipio: "01/01/2016",
      dataConclusaoGovernoFederal: null
      },
      {
      id: 786894,
      ano: 2013,
      titulo: "1ª Etapa da Reforma e Aquisição de Equipamentos Para Museu de Imagem do som (palácio dos Azulejos)",
      programa: "Se/dinc- Instala??o de Espa?os Culturais",
      area: "Cultura",
      fonte: "Ministerio da Cultura",
      concedente: "Ministerio da Cultura",
      status: "Não informado",
      temAditivo: false,
      verbaGovernoFederal: 888540.375,
      verbaMunicipio: 34907.671875,
      dataInicio: "30/01/2015",
      dataConclusaoMunicipio: "29/01/2017",
      dataConclusaoGovernoFederal: null

    }];

    if (!vm.city.hasData()) {
      $http.get(api.concat("/cidade/", vm.id), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.info = data;
          City.info = data;
      });
      $http.get(api.concat("/cidade/", vm.id, "/similares"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.similars = data;
          City.similars = data;
      });
      $http.get(api.concat("/cidade/", vm.id, "/iniciativas"), {
          headers: {'Access-Control-Allow-Origin': '*'}
      }).success(function(data) {
          vm.city.iniciativas = data;
          vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
          City.iniciativas = data;
      });
    } else {
      vm.initiative = vm.city.getInitiativeByID(vm.city.iniciativas, vm.id_initiative);
    }

    vm.loadMore = function() {
      var items = [];
      $http.get('js/test-timeline.json').success(function(data){
        items = data;
        vm.initiatives.push(items);
        moreData = true;
      }).error(function(data) {
          ionicToast.show("Todas as novidades carregadas", 'bottom', false, 2500);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
      items = [];
    };
}]);
