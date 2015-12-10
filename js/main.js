var app = angular.module("twitchApp", [])

  .controller("twitchController", ["$scope", "$http", function($scope, $http) {

    $scope.userNames = [
      "freecodecamp",
      "storbeck",
      "terakilobyte",
      "habathcx",
      "RobotCaleb",
      "thomasballinger",
      "noobs2ninjas",
      "beohoff",
      "MedryBW",
      "lifesaglitchtv"
    ];

    var count=0;

    $scope.users = [];

    $scope.userNames.forEach( function(username) {
      $http.get('https://api.twitch.tv/kraken/users/'+username)
        .success(function(userData) {

          console.log(userData["display_name"]);

          $http.get('https://api.twitch.tv/kraken/streams/'+username)
            .success(function(streamData) {
              console.log(userData["logo"]);
              $scope.users.push(
                {
                  "name": userData["display_name"],
                  "logo": userData["logo"],
                  "url": "http://www.twitch.tv/"+username,
                  "isonline": streamData["stream"] ? true : false
                });
            })
              .error(function(err) {

            });

        })
        .error(function(userData, status, headers, config) {
          console.log("couldn't find https://api.twitch.tv/kraken/users/"+username);
        });
    })

  }])

  // .factory('getUsers', ['$http', '$scope', function($http, $scope) {
  //
  //   $scope.userNames.forEach( function(username) {
  //
  //     $http.get('https://api.twitch.tv/kraken/users/'+username)
  //       .success(function(data) {
  //         $scope.users.push({"name": data["display_name"]});
  //       })
  //         .error(function(err) {
  //
  //       });
  //
  //   });
  //
  // }]);
