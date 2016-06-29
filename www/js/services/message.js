angular.module('Diferentonas')

  .factory('Message', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
    var Message = $resource(ApiEndpoint.url + '/mensagens/:id');
    return Message;
  }]);
