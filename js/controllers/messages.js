
angular.module('Diferentonas')

.controller('MessagesCtrl', ['$http', function($http) {
    var vm = this;
    
    $http.get('http://diferentonas.herokuapp.com/mensagens', {
        headers: {'Access-Control-Allow-Origin': '*'}
    }).success(function(data) {
        vm.messages = data;
    })
}]);
