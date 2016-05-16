angular.module('Diferentonas').factory('City', function() {
    return {
        'info': null,
        'similars': null,
        'convenios': null,
        'convFiltrados': null
    };
})


angular.module('Diferentonas').controller('CitySelectorController', function($scope, $http, $location, City) {
    $scope.cityInput = "";
    $scope.selectedCity = null;
    $scope.isSelected = false;
    $scope.isInputSelected = false;

    $http.get('js/cities.json').success(function(data) {
        $scope.cities = data;
    });

    $scope.inputIsFocused = function() {
        $scope.isInputSelected = !$scope.isInputSelected;
    }

    $scope.selectCity = function(city) {
        $scope.cityInput = city.nome + ' - ' + city.uf;
        $scope.selectedCity = city;
        $scope.isSelected = !$scope.isSelected;
        $scope.cityCleared();
        $scope.citySearched(city);
    };

    $scope.citySearched = function(city) {
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.info = data;
        })
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id).concat('/similares'), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.similars = data;
        })
        $http.get('http://diferentonas.herokuapp.com/cidade/'.concat(city.id).concat('/convenios'), {
            headers: {'Access-Control-Allow-Origin': '*'}
        }).success(function(data) {
            City.convenios = data;
        })
        $scope.City = City;
        $location.path('/cards');
    }

    $scope.cityCleared = function() {
        $scope.cityInput = '';
        $scope.selectedCity = null;
        $scope.isSelected = false;
        $scope.isInputSelected = false;
    }
})

angular.module('Diferentonas').controller('CardsController', function($scope, $location, $http, $ionicScrollDelegate, City) {

    $scope.City = City;

    $scope.toggleCard = function(card) {
        if ($scope.isCardShown(card)) {
            $scope.shownCard = null;
        } else {
            $scope.shownCard = card;
        }
    };

    $scope.isCardShown = function(card) {
        return $scope.shownCard === card;
    }

    $scope.returnClicked = function() {
        $location.path('/search');
    }

    $scope.checkConvenios = function(tema) {
        var convFiltrados = [];
        for (var index in City.convenios) {
            if (City.convenios[index].orgaoSuperior === tema)
                convFiltrados.push(City.convenios[index]);
        }
        console.log(convFiltrados);
        City.convFiltrados = convFiltrados;

        $location.path('/convenios');
    }

    $scope.hasOutliers = function(city) {
        var count = 0;
        city.scores.forEach(function(theme) {
            if (theme.score > 0.9 || theme.score < -0.9)
            count = count + 1;
        });
        return count !== 0;
    }

    $scope.formatCurrency = function(n) {
        if (n >= 1000000 && n < 2000000)
            return 'R$ ' + Math.round(n * 0.000001) + ' Milhão'
        else if (n >= 2000000)
            return 'R$ ' + Math.round(n * 0.000001) + ' Milhões'
        else
            return 'R$ ' + Math.round(n * 0.001) + ' Mil'
    }

    $scope.beautify = function(str) {
        var tmp =  str.replace(/MINIST[EÉ]RIO D[AEO]S? /, '');
        if (tmp === 'Presidencia da República')
            return tmp;
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

.controller('ConveniosController', function($scope, City) {
    $scope.City = City;

    $scope.beautify = function(str) {
        var tmp =  str.replace(/MINIST[EÉ]RIO D[AEO]S? /, '');
        if (tmp === 'Presidencia da República')
            return tmp;
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

    $scope.formatCurrency = function(n, c, d, t, j) {
        n = Math.round(n);
        c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
})
