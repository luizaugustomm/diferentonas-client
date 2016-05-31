
angular.module('Diferentonas')

.controller('BroadcastCtrl', ['$http', function($http) {
    var vm = this;
    var api = 'http://diferentonas.herokuapp.com/mensagens';

    vm.title = '';
    vm.message = '';
    vm.messages = [];

    vm.getMessages = function() {
        $http.get(api, {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            vm.messages = data;
        })
    }

    vm.submit = function() {
        var data = {
            titulo: vm.title,
            conteudo: vm.message
        };
        if (vm.title && vm.message) {
            $http.post(api, data)
                .success(function(data, status) {
                    vm.title = '';
                    vm.message = '';
                    vm.getMessages();
                    console.log('Mensagem enviada com sucesso!');
                }).error(function(data, status) {
                    console.log('Falha no envio. :/');
                })
        } else {
            alert('Preencha todos os campos!');
        }
    }

    vm.delete = function(id) {
        $http.delete(api.concat('/'+id)).success(function(data, status) {
            vm.getMessages();
        })
    }
}]);
