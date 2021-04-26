$(document).ready(function() {
	let playToken = "foo="+$("#play_token").val();
	console.log(playToken)
	var socket = io.connect('http://localhost:8080',  { query: playToken });


	socket.on('playerCount', function (data) {
		inf = data;
		let players = data.players;
		for(key of Object.getOwnPropertyNames(inf.players)) {
			console.log(players[key])
			$("#playerList").append('<tbody> ' +
                  '  <tr>' +
                  '    <th scope="row">#</th>' +
                  '    <td>'+players[key].pseudo+'</td>' +
                  '    <td>'+players[key].niveau+'</td>' +
                  '    <td><a class="btn btn-danger" href="/fight/'+players[key].id+'">Combattre !</<></td>' +
                  '  </tr>' +
                  '</tbody>');
		}


		$("#playerCount").text(data.val);
	});
});