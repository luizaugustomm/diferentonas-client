angular.module('Diferentonas')
.directive('dfTimelineCard', function() {
  return {
    restrict: 'E',
    scope: {
      novidade: '='
    },
    templateUrl: 'templates/directives/timeline-card.html'
  }
});

angular.module('Diferentonas')
.directive('ngShowHeart', function() {
	return{
		restrict: 'A',
		 link: function(scope, elem, attrs) {
			angular.element(document).ready(function (){
				if(attrs.tipo=="coracao"){
					elem.css("color", "#99003c");
          		}else{
          			elem.css("color", "#ECECEC");
          		}
            });
        }
    }
});

angular.module('Diferentonas')
.directive('ngShowBomb', function() {
	return{
		restrict: 'A',
		 link: function(scope, elem, attrs) {
			angular.element(document).ready(function (){
				if(attrs.tipo=="bomba"){
					elem.css("color", "#DD9F16");
          		}else{
          			elem.css("color", "#ECECEC");
          		}
            });
        }
    }
});

angular.module('Diferentonas')
.directive('ngShowBrokenheart', function() {
	return{
		restrict: 'A',
		 link: function(scope, elem, attrs) {
			angular.element(document).ready(function (){
				if(attrs.tipo=="coracao_partido"){
					elem.css("color", "#99003c");
          		}else{
          			elem.css("color", "#ECECEC");
          		}
            });
        }
    }
});
