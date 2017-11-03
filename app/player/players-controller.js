function PlayerController() {
    var loading = true; //start spinner
    var playersService = new PlayersService(ready);

    function ready() {
        loading = false; //stop spinner
        
    }
    this.getPlayersByTeam = function () {
        var team = document.getElementById('get-player-by-team').value
        playersService.getPlayersByTeam(team)
        console.log(playerData)
    }

    function draw(playersData) {
        var template = ''
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];

            template += `
            <div class="row innera player-card">
                <img src="${player.photo}">
                <h4>${player.fullname}</h4>
                <h6>${player.position}</h6>
                <h6>${player.pro_team}</h6>
            </div>
            `
        }
        document.getElementById('player-roster').innerHTML = template
            
    }
}