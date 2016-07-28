angular.module('Diferentonas')

.controller('HelpCtrl', ['$ionicHistory', function($ionicHistory) {
	var vm = this;

	vm.goBack = function() {
		$ionicHistory.goBack();
	}

	// Objetos para os exemplos
	vm.scoreMuitoMenos = {
		area: '',
		valorScore: -5,
		mediaCidadesSemelhantes: 500000,
		desvioCidadesSemelhantes: 100000,
		repasseTotal: 50000
	}
	vm.scoreMenos = {
		area: '',
		valorScore: -2,
		mediaCidadesSemelhantes: 500000,
		desvioCidadesSemelhantes: 100000,
		repasseTotal: 200000
	}
	vm.scoreMedia = {
		area: '',
		valorScore: 0,
		mediaCidadesSemelhantes: 500000,
		desvioCidadesSemelhantes: 100000,
		repasseTotal: 450000
	}
	vm.scoreMais = {
		area: '',
		valorScore: 1,
		mediaCidadesSemelhantes: 500000,
		desvioCidadesSemelhantes: 100000,
		repasseTotal: 700000
	}
	vm.scoreMuitoMais = {
		area: '',
		valorScore: 5,
		mediaCidadesSemelhantes: 500000,
		desvioCidadesSemelhantes: 100000,
		repasseTotal: 1000000
	}
	vm.city = {
		nome: "Minha Cidade",
		uf: "UF"
	}
}]);
