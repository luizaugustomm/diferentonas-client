angular.module('Diferentonas')
.controller('LoginCtrl', function($scope,$location,$state,$q,$cordovaFacebook,$ionicLoading,UserService) {
    $scope.data = {};

    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {info.resolve(response);},
        function (response) {info.reject(response);}
        );
      return info.promise;
    };

    var fbLoginSuccess = function (response) {
       if (!response.authResponse){
          fbLoginError("Cannot find the authResponse");
          return;
        }

        var authResponse = response.authResponse;

        getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {
          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          });
          $ionicLoading.hide();
          $state.go('search');
        }, function(fail){
          alert("Falha ao acessar o perfil" + fail);
        });    
    };

    $scope.facebookSignIn = function() {
        facebookConnectPlugin.login(["public_profile"],fbLoginSuccess,
        function (error) { alert("" + error) }
        );
    }
})