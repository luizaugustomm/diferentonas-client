angular.module('Diferentonas')

  .factory('Timeline', function($resource) {
    var Timeline = $resource('http://diferentonas.herokuapp.com/linhadotempo/:id');
    return Timeline;
  });
