angular.module('Diferentonas')

  .factory('Initiative', function($resource) {
    var Initiative = $resource('http://diferentonas.herokuapp.com/cidade/:id/iniciativas');
    return Initiative;
  });
