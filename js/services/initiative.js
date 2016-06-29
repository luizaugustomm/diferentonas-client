angular.module('Diferentonas')

  .factory('Initiative', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
    var Initiative = $resource(ApiEndpoint.url + '/iniciativas/:id');
    Initiative.similars = $resource(ApiEndpoint.url + '/iniciativas/:id/similares');
    return Initiative;
  }]);
