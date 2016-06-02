angular.module('Diferentonas')

.filter('ignoreAccents', ['$filter', function($filter) {
    return function(collection, term) {

      var removeAccents = function(word) {
        var map = {"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
        return word.replace(/[\W\[\] ]/g,function(a){return map[a]||a});
      }
      var newCollection = [];
      for (var i = 0; i < collection.length; i++) {
        newCollection[i] = collection[i];
        newCollection[i].newName = removeAccents(newCollection[i].nome);
      }
      return $filter('filter')(newCollection, term);
    }
}]);
