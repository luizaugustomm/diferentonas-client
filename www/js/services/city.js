angular.module('Diferentonas')

  .factory('City', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
    var City = $resource(ApiEndpoint.url + '/cidade/:id');
    City.cities = $resource('js/cities.json');
    City.similars = $resource(ApiEndpoint.url +'/cidade/:id/similares');
    City.news = $resource(ApiEndpoint.url +'/cidade/:id/linhadotempo?pagina=:npagina&tamanhoPagina=10');
    City.initiatives = $resource(ApiEndpoint.url +'/cidade/:id/iniciativas');
    City.isNeutral = function(valorScore) {
      return (valorScore > -0.7 && valorScore < 0.7);
    };
    City.isDifferent = function(valorScore) {
      return (valorScore <= -0.7 || valorScore >= 0.7);
    };
    City.getScoreText = function(valorScore) {
      if (City.isNeutral(valorScore)) {
        return "Recebeu dentro do esperado";
      } else {
        var x = valorScore;
        switch (true) {
          case (x < -1.5):
            return "Recebeu muito menos";
            break;
          case (x >= -1.5 && x < -0.7):
            return "Recebeu menos";
            break;
          case (x >= 0.7 && x < 1.5):
            return "Recebeu mais";
            break;
          default:
            return "Recebeu muito mais";
            break;
        }
      }
    };
    City.getInitiativeByID = function(initiatives, initiativeId) {
      if (initiatives !== null) {
        for (var i = 0; i < initiatives.length; i++) {
          if (initiatives[i].id == initiativeId) {
            return initiatives[i];
          }
        }
      }
    };
    City.getInitiativeStatus = function(initiative) {
      return initiative.status.replace(/ /g,'-').replace(/,/g,'').toLowerCase();
    };
    City.hasNeutralThemes = function(scores) {
        var neutrals = 0;
        scores.forEach(function(score) {
            if (City.isNeutral(score.valorScore))
                neutrals += 1;
        });
        return neutrals !== 0;
    };
    City.hasDifferentThemes = function(scores) {
        var diferentices = 0;
        scores.forEach(function(score) {
            if (City.isDifferent(score.valorScore) && score.area !== 'TOTAL GERAL')
                diferentices += 1;
        });
        return diferentices !== 0;
    };
    return City;
  }]);
