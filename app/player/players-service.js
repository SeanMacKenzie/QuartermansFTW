var PlayersService = function (callback) {
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var playersData = [];
    var myPlayers = [];

    this.getPlayersByTeam = function (teamName) {
        return playersData.filter(function (player) {
            if (player.team == teamName) {
                return true;
            }
        playersData.push(player)
        });
    }

    this.getPlayersByPosition = function (position) {
        return playersData.filter(function (player) {
            if (player.poisition == poisition) {
                return true;
            }
        playersData.push(player)
        });
    }

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            // return{
            //     name: playersData.fullname,
            //     image: playersData.photo,
            //     position: playersData.position,
            //     team: playersData.pro_team
            // }
            
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing

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
            // return{
            //     name: playersData.fullname,
            //     image: playersData.photo,
            //     position: playersData.position,
            //     team: playersData.pro_team
            // }
            // console.log(playersData)
        });
    }
    loadPlayersData(); //call the function above every time we create a new service
} 