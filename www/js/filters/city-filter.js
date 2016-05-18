angular.module('Diferentonas')

  .filter('formatName', function() {
    return function(name) {
      var tmp = name.replace(/MINIST[EÉ]RIO D[AEO]S? /, '');
      if (tmp === 'Presidencia da República') return tmp;

      tmp = tmp.replace('JUSTICA', 'JUSTIÇA')
      tmp = tmp.replace('PECUARIA', ' PECUÁRIA')
      tmp = tmp.replace('CIENCIA', 'CIÊNCIA')
      tmp = tmp.replace('INOVACAO', 'INOVAÇÃO')
      tmp = tmp.replace('EDUCACAO', 'EDUCAÇÃO')
      tmp = tmp.replace('INTEGRACAO', 'INTEGRAÇÃO')
      tmp = tmp.replace('SAUDE', 'SAÚDE')
      tmp = tmp.replace('COMUNICACOES', 'COMUNICAÇÕES')
      tmp = tmp.replace('COMERCIO', 'COMÉRCIO')
      tmp = tmp.replace('AGRARIO', 'AGRÁRIO')
      tmp = tmp.replace('ORCAMENTO', 'ORÇAMENTO')
      tmp = tmp.replace('GESTAO', 'GESTÃO')

      return tmp.charAt(0) + tmp.slice(1).toLowerCase();
    }
  })

  .filter('formatCurrency', function() {
    return function(n) {
      if (n >= 1000000 && n < 2000000)
          return 'R$ ' + Math.round(n * 0.000001) + ' Milhão'
      else if (n >= 2000000)
          return 'R$ ' + Math.round(n * 0.000001) + ' Milhões'
      else
          return 'R$ ' + Math.round(n * 0.001) + ' Mil'
    }
  });
