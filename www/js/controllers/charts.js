angular.module('Diferentonas')

.controller('BarChartCtrl', function($scope){
	$scope.options = {  
		chart: {
			type: 'discreteBarChart',
    		height: 200,
    		x: function(d){return d.label;},
    		y: function(d){return d.value;},
    	    showValues: true,
    		interactive: false,
    		stacked: false,
    		xAxis: {showMaxMin: false},
    		showYAxis:false,
    		showXAxis:false,
    		margin:{"left":5, "right":10, "top":40, "bottom":20}
			}
		};
  		
	$scope.data = [{key:"Analise de iniciativa", 
					values: [{"label":"Bomba","value":20,"color": "#5D5D5D"}, 
						 {"label":"Curti","value":10,"color": "#5D5D5D"}, 
        				 {"label":"Não curti","value":70,"color": "#5D5D5D"}]}];
})

