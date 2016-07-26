angular.module('Diferentonas')

  .factory('Timeline', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
    var Timeline = $resource(ApiEndpoint.url + '/linhadotempo?pagina=:npagina&tamanhoPagina=10');
    return Timeline;
  }]);
