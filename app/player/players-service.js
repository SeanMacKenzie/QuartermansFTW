function PlayersService(callback) {
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var playersData = [];
    var myPlayers = [];

    this.getPlayersData = function () {
        return JSON.parse(JSON.stringify(playersData))
    }

    this.getMyPlayers = function () {
        return JSON.parse(JSON.stringify(myPlayers))
    }

    this.getPlayersByTeam = function (teamName) {
        return playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });

    }



    this.getPlayersByPosition = function (position) {
        return playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }

        });

    }

    this.getPlayersByName = function (name) {
        return playersData.filter(function (player) {
            if (player.fullname == name || player.firstname == name || player.lastname == name) {
                return true;
            }
        });
    }

    this.addMyPlayers = function (id) {
        for (i in playersData) {
            var player = playersData[i]
            if (player.id === id) {
                myPlayers.push(player)
            }


        }
        console.log(myPlayers)
    }

    this.removeMyPlayers = function (id) {
        for (var i = 0; i < myPlayers.length; i++) {
            var player = myPlayers[i]
            if (player.id === id) {
                myPlayers.splice(i, 1);
                break;
            }

        }
        console.log(myPlayers)
    }
    


    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);

            console.log(playersData)
            return callback();


        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            //console.log('Player Data Ready')
            //console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            //console.log('Finished Writing Player Data to localStorage')
            callback()

        });
    }
    loadPlayersData(); //call the function above every time we create a new service
} 