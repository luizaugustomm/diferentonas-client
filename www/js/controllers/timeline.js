angular.module('Diferentonas')

.controller('TimelineCtrl', ['$ionicHistory', '$scope', '$http', '$ionicLoading', 'ionicToast', 'Timeline', function($ionicHistory, $scope , $http, $ionicLoading, ionicToast, Timeline) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.moreData = false;
    vm.news = Timeline.query(function() {
      if(vm.news.length == 0){
        moreData = false;
      }else{
        moreData = true;
      }
      $ionicLoading.hide();
    }, function() {
      $ionicLoading.hide();
      ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2500);
    });

    vm.loadMore = function() {
      var items = Timeline.query(function() {
        if(items.length == 0){
          ionicToast.show("Não existem mais novidades", 'bottom', false, 2500);
          moreData = false;
        }else{
          vm.news.push(items);
          moreData = true;
        }
        $ionicLoading.hide();
      }, function() {
        $ionicLoading.hide();
        ionicToast.show("Não foi possível carregar mais informações, tente mais tarde.", 'center', false, 2500);
      })
      $scope.$broadcast('scroll.infiniteScrollComplete');
      items = [];
    };

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
