
angular.module('Diferentonas')

.controller('MessagesCtrl', ['$http', '$ionicLoading', 'Message', function($http, $ionicLoading, Message) {
    $ionicLoading.show({ template: "<ion-spinner></ion-spinner>" });
    var vm = this;
    vm.messages = Message.query(function() {
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
    });
}]);
