angular.module('Diferentonas')

.directive('dfUpdatedInitiativeCard', function() {
  return {
    restrict: 'E',
    scope: {
      new: '=',
      city: '=',
      initiative: '=',
      showcityname: '='
    },
    templateUrl: 'templates/directives/updated-initiative-card.html',
    link: function(scope, element, attrs) {
      scope.getUpdatedFieldLabel = function(field) {
        switch (field) {
          case "ano":
            return "Ano";
            break;
          case "titulo":
            return "Título";
            break;
          case "area":
            return "Área";
            break;
          case "fonte":
            return "Fonte";
            break;
          case "concedente":
            return "Concedente";
            break;
          case "status":
            return "Status";
            break;
          case "temAditivo":
            return "Aditivo";
            break;
          case "verbaGovernoFederal":
            return "Valor repassado pelo Governo Federal";
            break;
          case "verbaMunicipio":
            return "Valor complementado pela prefeitura";
            break;
          case "dataInicio":
            return "Data de início da iniciativa";
            break;
          case "dataConclusaoMunicipio":
            return "Data de conclusão da iniciativa";
            break;
          case "dataConclusaoGovernoFederal":
            return "Prazo para prestação de contas";
            break;
          default:
            return "Desconhecido"
            break;
        }
      }
    }
  }
});
