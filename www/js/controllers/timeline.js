angular.module('Diferentonas')

.controller('TimelineCtrl', ['$ionicHistory', '$scope', '$http', '$ionicLoading', 'ionicToast', 'Timeline', function($ionicHistory, $scope , $http, $ionicLoading, ionicToast, Timeline) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.moreData = false;
    vm.initiatives = [];

    vm.initiatives = Timeline.query(function() {
      if (vm.initiatives.length == 0) {
        vm.initiatives = [{
          id: null,
          titulo: "No momento não temos novidades para serem exibidas, para ver novidades na sua linha do tempo você deve seguir Iniciativas ou Cidades.",
          status: "Não existem novidades disponíveis no sistema"}];
      } else {
          vm.moreData = false;
      }
        vm.moreData = false;
        $ionicLoading.hide();
    }, function(error) {
        $ionicLoading.hide();
        ionicToast.show("Não foi possível carregar mais novidades.", 'bottom', false, 2500);
    });

    vm.loadMore = function() {
      var items = [];
      $http.get(api.concat("/linhadotempo")).success(function(data){
        if(data.length == 0){
          ionicToast.show("Não existem mais novidades", 'bottom', false, 2500);
          moreData = false;
        }else{
          items = data;
          vm.initiatives.push(items);
          moreData = true;
        }
      }).error(function(data) {
          ionicToast.show("Não foi possível carregar mais novidades.", 'bottom', false, 2500);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
      items = [];
    };

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
