angular.module('Diferentonas')

.controller('TimelineCtrl', ['$ionicHistory', '$scope', '$http', '$ionicLoading', 'ionicToast', 'Timeline', function($ionicHistory, $scope , $http, $ionicLoading, ionicToast, Timeline) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.moreData = true;
    vm.np = 0;
    vm.news = Timeline.query({npagina : vm.np}, function() {
      if(vm.news.length === 0){
        vm.moreData = false;
      }else{
        vm.moreData = true;
      }
      vm.np++;
      $ionicLoading.hide();
    }, function() {
      $ionicLoading.hide();
      ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2000);
    });

    vm.doRefresh = function() {
      vm.moreData = true;
      vm.np = 0;
      vm.news = Timeline.query({npagina : vm.np}, function() {
        if(vm.news.length === 0){
          vm.moreData = false;
        }else{
          vm.moreData = true;
        }
        vm.np++;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function() {
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2000);
      });
    }

    vm.loadMore = function() {
      var items = Timeline.query({npagina : vm.np}, function() {
        console.log("Current page = " + vm.np);
        if (items.length === 0){
          ionicToast.show("Não existem mais novidades", 'bottom', false, 2000);
          vm.moreData = false;
        } else {
          vm.news = vm.news.concat(items);
          vm.moreData = true;
          vm.np++;
        }
        items = [];
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
      }, function() {
        $ionicLoading.hide();
        ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2000);
      });
    };

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
