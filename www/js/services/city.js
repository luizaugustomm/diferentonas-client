angular.module('Diferentonas')

  .factory('City', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint) {
    var City = $resource(ApiEndpoint.url + '/cidade/:id');
    City.cities = $resource('js/cities.json');
    City.similars = $resource(ApiEndpoint.url +'/cidade/:id/similares');
    City.news = $resource(ApiEndpoint.url +'/cidade/:id/linhadotempo');
    City.initiatives = $resource(ApiEndpoint.url +'/cidade/:id/iniciativas');
    City.isNeutral = function(valorScore) {
      return (valorScore > -1 && valorScore < 1);
    };
    City.isDifferent = function(valorScore) {
      return (valorScore <= -1 || valorScore >= 1);
    };
    City.getScoreText = function(valorScore) {
      if (this.isNeutral(valorScore)) {
        return "Recebeu dentro do esperado";
      } else {
        var x = valorScore;
        switch (true) {
          case (x < -2):
            return "Recebeu muito menos";
            break;
          case (x >= -2 && x < -1):
            return "Recebeu menos";
            break;
          case (x >= 1 && x < 2):
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
