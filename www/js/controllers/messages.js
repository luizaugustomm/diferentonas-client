
angular.module('Diferentonas')

.controller('MessagesCtrl', ['$ionicHistory','ionicToast', '$http','$ionicLoading', 'Message', function($ionicHistory, ionicToast, $http, $ionicLoading, Message) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.messages = Message.query(function() {
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      ionicToast.show("Não foi possível carregar dados, tente mais tarde.", 'center', false, 2500);
    });

    vm.goBack = function() {
      $ionicHistory.goBack();
    }
}]);
