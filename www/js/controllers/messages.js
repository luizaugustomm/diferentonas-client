
angular.module('Diferentonas')

.controller('MessagesCtrl', ['$ionicHistory', '$http', '$ionicLoading', 'Message', function($ionicHistory, $http, $ionicLoading, Message) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.messages = Message.query(function() {
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
    });

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
