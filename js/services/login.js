angular.module('Diferentonas')
.service('UserService', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
  return $resource(ApiEndpoint.url + '/cidadao');
}]);
