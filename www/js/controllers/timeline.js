angular.module('Diferentonas')

.controller('TimelineCtrl', ['$scope','$http','ionicToast','City', function($scope,$http,ionicToast,City) {
    var vm = this;
    var api = "http://diferentonas.herokuapp.com";
    vm.city = City;
    $scope.moreData=false;
    vm.initiatives = [];

    $http.get(api.concat("/linhadotempo")).success(function(data){
        if(data.length == 0){
              vm.initiatives = [{id: null,
              titulo: "No momento não temos novidades para serem exibidas, para ver novidades na sua linha do tempo você deve seguir Iniciativas ou Cidades.",
              status: "Não existem novidades disponíveis no sistema"}];
        }else{
              vm.initiatives = data;
              $scope.moreData = false;
              console.log(data);
        }
    }).error(function(data) {
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
}]);
