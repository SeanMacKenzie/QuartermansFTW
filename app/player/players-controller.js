function PlayerController() {
    var loading = true; //start spinner
    var playersService = new PlayersService(ready);

    function ready() {
        loading = false; //stop spinner
        // $('some-button').on('click', function () {
        //     var teamSF = playerService.getPlayersByTeam("SF");
        // })
        //     console.log(playersData)
    }


    this.getPlayersByTeam = function () {
        var team = document.getElementById('get-player-by-team').value
        // console.log(team)
        var teamArr = playersService.getPlayersByTeam(team)
        // console.log(playersData)
        draw(teamArr)
    }

    this.getPlayersByPosition = function () {
        var position = document.getElementById('get-player-by-position').value
        var teamArr = playersService.getPlayersByPosition(position)
        draw(teamArr)
    }

    this.getPlayersByName = function () {
        var name = document.getElementById('get-player-by-name').value
        var teamArr = playersService.getPlayersByName(name)
        draw(teamArr)
    }

    this.addMyPlayers = function (id){
        playersService.addMyPlayers(id)
        drawOptions()
    }

    this.removeMyPlayers = function (id){
        playersService.removeMyPlayers(id)
        drawOptions()
    }



    function draw(playersData) {
        playersService.getPlayersData()
        var template = ''
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];

            template += `
            <div class="col-12-md innerg player-card">
                <img src="${player.photo}">
                <h4>${player.fullname}</h4>
                <h6>${player.position}</h6>
                <h6>${player.pro_team}</h6>
                <div>
                    <button class="btn-success" id="${player.id}" onclick="app.controllers.playerController.addMyPlayers('${player.id}')">Add to Roster</button>
              </div>
            </div>
            `
        }
        document.getElementById('player-roster').innerHTML = template

    }

    
    function drawOptions(myPlayers) {
        var myPlayers = playersService.getMyPlayers()
        var template = ''
        for (var i = 0; i < myPlayers.length; i++) {
            var player = myPlayers[i];

            template += `
            <div class="col-md-12 innerb player-card">
                <img src="${player.photo}">
                <h4>${player.fullname}</h4>
                <h6>${player.position}</h6>
                <h6>${player.pro_team}</h6>
                <div>
                    <button class="btn-danger" id="${player.id}" onclick="app.controllers.playerController.removeMyPlayers('${player.id}')">Remove</button>
              </div>
            </div>
            `
        }
        document.getElementById('my-team').innerHTML = template

    }
}