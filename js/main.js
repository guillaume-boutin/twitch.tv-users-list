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
      "lifesaglitchtv",
      "lagtvmaximusblack"
    ];

    var count=0;

    $scope.users = [];

    $scope.userNames.forEach( function(username) {
      $http.get('https://api.twitch.tv/kraken/users/'+username)
        .success(function(userData) {

          $http.get('https://api.twitch.tv/kraken/streams/'+username)
            .success(function(streamData) {
              $scope.users.push(
                {
                  "name": userData["display_name"],
                  "logo": userData["logo"],
                  "url": "http://www.twitch.tv/"+username,
                  "isOnline": streamData["stream"] ? true : false
                });
                console.log(userData["display_name"]+' is '+ (streamData["stream"] ? "online" : "offline"));
            })
              .error(function(err) {

            });

        })
        .error(function(userData, status, headers, config) {
          console.log("couldn't find https://api.twitch.tv/kraken/users/"+username);
        });
    })

    $scope.activeButton = {
      "all": true,
      "online": false,
      "offline": false
    }

    $scope.toggle = function(buttonClicked) {
      $scope.activeButton.all = false;
      $scope.activeButton.online = false;
      $scope.activeButton.offline = false;
      $scope.activeButton[buttonClicked] = true;
    }

  }])
