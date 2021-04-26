$(document).ready(function() {
	var socket = io.connect('http://localhost:8080');


	socket.on('playerCount', function (data) {
		inf = data;
		let players = data.players;
		for(key of Object.getOwnPropertyNames(inf.players)) {
			console.log(players[key])

		}


		$("#playerCount").text(data.val);
	});
});