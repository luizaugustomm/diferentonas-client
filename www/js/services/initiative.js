angular.module('Diferentonas')

  .factory('Initiative', function($resource) {
    var Initiative = $resource('http://diferentonas.herokuapp.com/iniciativas/:id');

    return Initiative;
  });
