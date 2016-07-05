angular.module('Diferentonas')
.service('UserService', function() {
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  var deleteUser = function(){
    window.localStorage.starter_facebook_user = JSON.stringify('{}');
  }

  return {
    getUser: getUser,
    setUser: setUser,
    deleteUser: deleteUser
  };

});