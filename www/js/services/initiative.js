angular.module('Diferentonas')

  .factory('Initiative', function($resource) {
    var Initiative = $resource('http://diferentonas.herokuapp.com/iniciativas/:id');
    Initiative.similars = $resource('http://diferentonas.herokuapp.com/iniciativas/:id/similares');
    return Initiative;
  });
