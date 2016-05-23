angular.module('Diferentonas')

  .factory('City', function() {
      return {
          info: {
            id: null,
            nome: null,
            uf: null,
            idhm: 0,
            idhmRenda: 0,
            idhmLongevidade: 0,
            idhmEducacao: 0,
            populacao: 0,
            scores: []
          },
          similars: null,
          iniciativas: null,
          convFiltrados: null,
          isNeutral: function(score) {
            return (score.valorScore > -1 && score.valorScore < 1);
          },
          getScoreText: function(score) {
            if (this.isNeutral(score)) {
              return "Recebeu na média";
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
          },
          getInitiativeByID: function(initiatives, initiativeId) {
            if (initiatives !== null) {
              for (var i = 0; i < initiatives.length; i++) {
                if (initiatives[i].id == initiativeId) {
                  return initiatives[i];
                }
              }
            }
          },
          getInitiativeStatus: function(initiative) {
            return initiative.status.replace(/ /g,'-').replace(/,/g,'').toLowerCase();
          },
          hasData: function() {
            return (this.info.id !== null)
          }
      };
  });
