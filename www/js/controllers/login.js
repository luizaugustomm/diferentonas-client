angular.module('Diferentonas')
.controller('LoginCtrl', function($scope,$location,$state,$q,$ionicLoading,UserService,$auth) {
    $scope.data = {};

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          console.log(response);
          $auth.setToken(response);
          $location.path('/search');
        })
        .catch(function(response) {
          console.log(response.data);
        });
    };

    if ($auth.isAuthenticated()) {
      $location.path('/search');
    }

    // var getFacebookProfileInfo = function (authResponse) {
    //   var info = $q.defer();
    //
    //   facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
    //     function (response) {info.resolve(response);},
    //     function (response) {info.reject(response);}
    //     );
    //   return info.promise;
    // };
    //
    // var fbLoginSuccess = function (response) {
    //    if (!response.authResponse){
    //       fbLoginError("Cannot find the authResponse");
    //       return;
    //     }
    //
    //     var authResponse = response.authResponse;
    //
    //     getFacebookProfileInfo(authResponse)
    //     .then(function(profileInfo) {
    //       UserService.setUser({
    //         authResponse: authResponse,
    //         userID: profileInfo.id,
    //         name: profileInfo.name,
    //         email: profileInfo.email,
    //         picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
    //       });
    //       $ionicLoading.hide();
    //       $state.go('search');
    //     }, function(fail){
    //       alert("Falha ao acessar o perfil" + fail);
    //     });
    // };
    //
    // $scope.facebookSignIn = function() {
    //     facebookConnectPlugin.login(["public_profile"],fbLoginSuccess,
    //     function (error) { alert("" + error) }
    //     );
    //     $cordovaOauth.facebook("1168526739834367", ["email"], {
    //       "auth_type": "rerequest"
    //     }).then(function(result) {
    //       console.log(JSON.stringify(result));
    //     }, function(error) {
    //       console.log(JSON.stringify(error));
    //     });
    //
    // }
})
