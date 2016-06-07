angular.module('Diferentonas')

.filter('formatCurrency', function() {
    return function(n) {
        if (n >= 1100000000) {
            if (Math.trunc(n * 0.00000001) % 10 === 0)  return 'R$ ' + Math.trunc(n * 0.00000001) * 0.1 + ' Bilhões';
            else                                       return 'R$ ' + (Math.trunc(n * 0.00000001) * 0.1).toFixed(1) + ' Bilhões';
        } else if (n >= 1000000000) {
            return 'R$ ' + Math.trunc(n * 0.00000001) * 0.1 + ' Bilhão';
        } if (n >= 1100000) {
            if (Math.trunc(n * 0.00001) % 10 === 0)  return 'R$ ' + Math.trunc(n * 0.00001) * 0.1 + ' Milhões';
            else                    return 'R$ ' + (Math.trunc(n * 0.00001) * 0.1).toFixed(1) + ' Milhões';
        } else if (n >= 1000000) {
            return 'R$ ' + Math.trunc(n * 0.00001) * 0.1 + ' Milhão';
        } else if (n >= 1000) {
            return 'R$ ' + Math.trunc(n * 0.001) + ' Mil';
        } else {
            return 'R$ ' + n + ',00';
        }
    }
})

.filter('abs', function() {
    return function(num) {
        return Math.abs(num);
    }
});
