angular.module('Diferentonas')

  .factory('Message', function($resource) {
    var Message = $resource('http://diferentonas.herokuapp.com/mensagens/:id');
    return Message;
  });
