angular.module('Diferentonas')
.controller('BarChartCtrl', function($scope){
	$scope.options = {
		chart: {
			type: 'discreteBarChart',
				width: 50,
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
});

angular.module('Diferentonas')
.directive('ngToDate', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var margin = "320px 0 0 50%";
            angular.element(document).ready(function (){
            	if(attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
            		attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
            		margin="20px 0 0 50%";
            	}else if(attrs.statusIniciative=="Em andamento"){
            		var begin = new Date((attrs.beginIniciative.slice(6,10)+"-"+
            							attrs.beginIniciative.slice(3,5)+"-"+
            							attrs.beginIniciative.slice(0,2)));
            		var end = new Date((attrs.endIniciative.slice(6,10)+"-"+
            							attrs.endIniciative.slice(3,5)+"-"+
            							attrs.endIniciative.slice(0,2)));
            		var today = new Date (new Date().toJSON().slice(0,10));
            		var estimated = (Math.round((end - begin)/(1000*60*60*24)));
            		var currentDay = (Math.round((end-today)/(1000*60*60*24)))
            		var daypx = estimated/210;
            		margin = ((currentDay/daypx)+90)+"px 0 0 50%";
            	}else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
            		margin = "90px 0 0 50%";
            	}
            	elem.css("margin", margin);
            });
        }
    }
});

angular.module('Diferentonas')
.directive('ngToDone', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var height = "300px";
            angular.element(document).ready(function (){
            	if(attrs.statusIniciative=="Aprovada pelo Governo Federal"||
            		attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
            		height = "0px";
            	}else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
            		height = "75px";
            	}else if(attrs.statusIniciative=="Em andamento"){
            		var begin = new Date((attrs.beginIniciative.slice(6,10)+"-"+
            							attrs.beginIniciative.slice(3,5)+"-"+
            							attrs.beginIniciative.slice(0,2)));
            		var end = new Date((attrs.endIniciative.slice(6,10)+"-"+
            							attrs.endIniciative.slice(3,5)+"-"+
            							attrs.endIniciative.slice(0,2)));
            		var today = new Date (new Date().toJSON().slice(0,10));
            		var estimated = (Math.round((end - begin)/(1000*60*60*24)));
            		var currentDay = (Math.round((end-today)/(1000*60*60*24)))
            		var daypx = estimated/225;

            		height = ((currentDay/daypx)+75) + "px";
            	}
            	elem.css("height", height);
            });
        }
    }
});

angular.module('Diferentonas')
.directive('ngShowStatus', function() {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var margin = "290px";
            angular.element(document).ready(function (){
            	if(attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
            		attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
            		margin="-5px";
            	}else if(attrs.statusIniciative=="Em andamento"){
            		var begin = new Date((attrs.beginIniciative.slice(6,10)+"-"+
            							attrs.beginIniciative.slice(3,5)+"-"+
            							attrs.beginIniciative.slice(0,2)));
            		var end = new Date((attrs.endIniciative.slice(6,10)+"-"+
            							attrs.endIniciative.slice(3,5)+"-"+
            							attrs.endIniciative.slice(0,2)));
            		var today = new Date (new Date().toJSON().slice(0,10));
            		var estimated = (Math.round((end - begin)/(1000*60*60*24)));
            		var currentDay = (Math.round((end-today)/(1000*60*60*24)))
            		var daypx = estimated/222;
            		margin = ((currentDay/daypx)+68)+"px";
            	}else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
            		margin = "68px";
            	}
            	elem.css("margin-top", margin);
            });
        }
    }
});
