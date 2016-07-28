angular.module('Diferentonas')
.directive('ngToDone', ['$timeout','$compile', function($timeout,$compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var height = "0px";
            var changeBar = function (){
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
                if(end < today){
                    height = "0px";
                }
                elem.css("height", height);
            }
            $timeout(changeBar,1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngShowStatus',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var margin = "10px";
            var color = "#DD3C16";
            var changeBox = function(){
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

                margin = ((currentDay/daypx)+100) + "px";

                if(end < today){
                    margin = "10px";
                }
                elem.css("margin-top", margin);
            }

            var changeColorBox = function(){
                if(attrs.statusIniciative == "Em andamento"){
                    color = "transparent #DD9F16 transparent transparent";
                }else if(attrs.statusIniciative=="Concluída, segundo a prefeitura" || 
                    attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
                attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "transparent #7770CB transparent transparent";
                }else if(attrs.statusIniciative=="Não iniciada" || attrs.statusIniciative=="Anulado"){
                    color = "transparent #DD3C16 transparent transparent";
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "transparent #5C5C5C transparent transparent";
                }
                elem.css("border-color",color);
            }
            $timeout(changeColorBox, 1000);
            $timeout(changeBox,1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngSquareStatus',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var margin = "10px";
            var color = "#DD3C16";
            var changeColorBox = function(){
                if(attrs.statusIniciative == "Em andamento"){
                    color = "solid 3px #DD9F16";
                    elem.css("height", "65px");
                }else if(attrs.statusIniciative=="Concluída, segundo a prefeitura" || 
                    attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
                attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "solid 3px #7770CB";
                }else if(attrs.statusIniciative=="Não iniciada" || attrs.statusIniciative=="Anulado"){
                    color = "solid 3px #DD3C16";
                    elem.css("height", "65px");
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "solid 3px #5C5C5C";
                    elem.css("height", "65px");
                }
                elem.css("border",color);
            }
            $timeout(changeColorBox, 1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngToStatus',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var color = "3px solid #5D5D5D";
            var today = new Date (new Date().toJSON().slice(0,10));

            var changeColor = function(){
                if(attrs.status == "Em andamento"){
                    color = "3px solid #DD9F16";
                }else if(attrs.status=="Concluída, segundo a prefeitura"){
                    color = "3px solid #7770CB";
                }else if(attrs.status=="Não iniciada" || attrs.statusIniciative=="Anulado"){
                    color = "3px solid #DD3C16";
                }else if(attrs.status=="Aprovada pelo Governo Federal" ||
                attrs.status=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "3px solid #58A87D";
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "3px solid #5C5C5C";
                }
                elem.css("border",color);
            }

            var changeIcon = function(){
                if((attrs.statusIniciative === "Não iniciada") &
                    (today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    
                    elem.addClass('icon-delay ion-close');
                } else if((attrs.statusIniciative=="Anulado") &
                    (today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    
                    elem.addClass('icon-delay ion-close');
                }
                elem.addClass('icon-check ion-checkmark');
                $compile(elem)(scope);
            }

            $timeout(changeIcon,1000);
            $timeout(changeColor,1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngToConclusion',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var color = "3px solid #5D5D5D";
            var today = new Date (new Date().toJSON().slice(0,10));

            var changeColor = function(){
                if(attrs.statusIniciative == "Em andamento" && (today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    color = "3px solid #DD9F16";
                }else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
                    color = "3px solid #7770CB";
                }else if(attrs.statusIniciative=="Não iniciada" || attrs.statusIniciative=="Anulado"){
                    color = "3px solid #DD3C16";
                }else if(attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
                attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "3px solid #58A87D";
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "3px solid #5C5C5C";
                }
                elem.css("border",color);
            }
            var changeIcon = function(){
                if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
                    elem.addClass('icon-check ion-checkmark');   
                }else if((today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    elem.addClass('icon-delay ion-close');
                }
                
                $compile(elem)(scope);
            }
            $timeout(changeIcon,1000);
            $timeout(changeColor,1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngToEnd',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var color = "3px solid #5D5D5D";
            var today = new Date (new Date().toJSON().slice(0,10));

            var changeColor = function(){
                if(attrs.statusIniciative == "Em andamento" && (today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    color = "3px solid #DD9F16";
                }else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"&& (today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    color = "3px solid #7770CB";
                }else if(attrs.statusIniciative=="Não iniciada" || attrs.statusIniciative=="Anulado"
                    ||  attrs.statusIniciative=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "3px solid #DD3C16";
                }else if(attrs.statusIniciative=="Aprovada pelo Governo Federal"){
                    color = "3px solid #58A87D";
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "3px solid #5C5C5C";
                }
                elem.css("border",color);
            }
            var changeIcon = function(){
                if((today > new Date((attrs.beginIniciative.slice(6,10)+"-"+
                          attrs.beginIniciative.slice(3,5)+"-"+
                          attrs.beginIniciative.slice(0,2))))){
                    elem.addClass('icon-delay ion-close');
                }else if(attrs.statusIniciative=="Aprovada pelo Governo Federal"){
                    elem.addClass('icon-check ion-checkmark');   
                }
                 
                $compile(elem)(scope);
            }
            $timeout(changeIcon,1000);
            $timeout(changeColor,1000);
        }
    }
}]);

angular.module('Diferentonas')
.directive('ngToBar',['$timeout','$compile', function($timeout,$compile) {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var color = "#5D5D5D";
            var today = new Date (new Date().toJSON().slice(0,10));

            var colorBar = function(){
                if(attrs.statusIniciative == "Em andamento"){
                    color = "#DD9F16";
                }else if(attrs.statusIniciative=="Concluída, segundo a prefeitura"){
                    color = "#7770CB";
                }else if(attrs.statusIniciative=="Não iniciada" || attrs.statusIniciative=="Anulado"){
                    color = "#DD3C16";
                }else if(attrs.statusIniciative=="Aprovada pelo Governo Federal" ||
                attrs.status=="Aprovada pelo Governo Federal com ressalvas"){
                    color = "#58A87D";
                }else if(attrs.statusIniciative=="Não divulgado"){
                    color = "#5C5C5C";
                }
                elem.css("background",color);
            }
            $timeout(colorBar,1000);
        }
    }
}]);

