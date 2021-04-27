$(document).ready(function() {
	let playToken = "foo="+$("#play_token").val();
	console.log(playToken)
	var socket = io.connect('http://localhost:8080',  { query: playToken });


	socket.on('playerCount', function (data) {
		inf = data;
		let players = data.players;
		let table = '<thead><tr><th scope="col">#</th><th scope="col">Pseudo</th><th scope="col">Niveau</th><th scope="col">Combattre</th></tr></thead>';
		for(key of Object.getOwnPropertyNames(inf.players)) {
			console.log(players[key])
			table +='<tbody> ' +
                  '  <tr>' +
                  '    <th scope="row">#</th>' +
                  '    <td>'+players[key].pseudo+'</td>' +
                  '    <td>'+players[key].niveau+'</td>' +
                  '    <td><a class="btn btn-danger" href="/fight/'+players[key].id+'">Combattre !</<></td>' +
                  '  </tr>' +
                  '</tbody>';

		}
		console.log(table)
		$("#playerList").html(table);

		$("#playerCount").text(data.val);
	});
});