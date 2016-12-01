angular.module('Diferentonas')
  .directive('dfThemeChart', function($parse, $window) {
     return {
        restrict:'E',
        scope: {
          scoreValue: '=',
          baseColor: '='
        },
        template:"<svg></svg>",
          link: function(scope, elem, attrs) {
            var scoreValue = scope.scoreValue;
            var baseColor = scope.baseColor;
            var d3 = $window.d3;
            var rawSvg = elem.find('svg');
            var svg = d3.select(rawSvg[0]);
            var cfg = {
              width: 30,
              height: 1
            };

            var getScore = function(scoreValue) {
              switch (true) {
                case (scoreValue < -1.5):
                  return [1, 1, 0.5, 0.3, 0.3]; // Recebeu muito menos
                  break;
                case (scoreValue >= -1.5 && scoreValue < -0.7):
                  return [0.3, 1, 0.5, 0.3, 0.3]; // Recebeu menos
                  break;
                case (scoreValue >= -0.7 && scoreValue < 0.7):
                  return [0.3, 0.3, 0.5, 0.3, 0.3]; // Recebeu dentro do esperado
                  break;
                case (scoreValue >= 0.7 && scoreValue < 1.5):
                  return [0.3, 0.3, 0.5, 1, 0.3]; // Recebeu mais
                  break;
                default:
                  return [0.3, 0.3, 0.5, 1, 1]; // Recebeu muito mais
                  break;
              }
            }

            var drawRoundedRect = function(x, y, width, height, radius) {
              return "M" + x + "," + y
                 + "h" + (width - radius)
                 + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
                 + "v" + (height - 2 * radius)
                 + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
                 + "h" + (radius - width)
                 + "z";
            }

            var draw = function(data, baseColor) {
              var rectWidth = cfg.width*0.2;
              svg.attr("viewBox", "0 0 "+cfg.width+" "+cfg.height);
              data.forEach(function(d, i) {
                var x = rectWidth*i;
                var h = 1;
                if (i === 0) {
                  svg.append("path")
                    .attr("d", function(s) {
                      return drawRoundedRect(x, 0, rectWidth, h, 0.5);
                    })
                    .attr("fill", baseColor)
                    .attr("opacity", d)
                    .attr("transform", "rotate(180, "+rectWidth/2+", "+h/2+")");
                } else if (i === data.length-1) {
                  svg.append("path")
                    .attr("d", function(s) {
                      return drawRoundedRect(x, 0, rectWidth, h, 0.5);
                    })
                    .attr("fill", baseColor)
                    .attr("opacity", d);
                } else {
                  svg.append("rect")
                    .attr("x", x)
                    .attr("y", 0)
                    .attr("width", rectWidth)
                    .attr("height", h)
                    .attr("fill", baseColor)
                    .attr("opacity", d);
                }
              });
            }
            draw(getScore(scoreValue), baseColor);
          }
   };
});
