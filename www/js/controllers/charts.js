angular.module('Diferentonas')
.directive('ngToDone', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var height = "300px";
            var backgroundcolor = "#DD9F16";
            	elem.css("height", height);
                elem.css("background-color",backgroundcolor);
        }
    }
});

angular.module('Diferentonas')
.directive('ngShowStatus', function() {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var margin = "278px";
              elem.css("margin-top", margin);
        }
    }
});

angular.module('Diferentonas')
.directive('ngToStatus', function() {
   return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            var color = "3px solid #5D5D5D";
            console.log(attrs);
            if(attrs.statusIniciative === "Em andamento"){
                color = "3px solid #DD9F16";
            }
            elem.css("border",color);
        }
    }
});