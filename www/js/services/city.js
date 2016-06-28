angular.module('Diferentonas')

  .factory('City', function($resource) {
    var City = $resource('http://diferentonas.herokuapp.com/cidade/:id');
    City.initiatives = $resource('http://diferentonas.herokuapp.com/cidade/:id/iniciativas');
    City.isNeutral = function(score) {
      return (score.valorScore > -1 && score.valorScore < 1);
    };
    City.isDifferent = function(score) {
      return (score.valorScore <= -1 || score.valorScore >= 1);
    };
    City.getScoreText = function(score) {
      if (this.isNeutral(score)) {
        return "Recebeu dentro do esperado";
      } else {
        var x = score.valorScore;
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
            if (City.isNeutral(score))
                neutrals += 1;
        });
        return neutrals !== 0;
    };
    City.hasDifferentThemes = function(scores) {
        var diferentices = 0;
        scores.forEach(function(score) {
            if (City.isDifferent(score))
                diferentices += 1;
        });
        return diferentices !== 0;
    };
    return City;
  });
