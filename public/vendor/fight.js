$(document).ready(function() {
	let playToken = "foo="+$("#play_token").val();
	console.log(playToken)
	var socket = io.connect('http://localhost:8080',  { query: playToken });


	socket.on('playerCount', function (data) {
		inf = data;
		let players = data.players;
		let table = '<thead><tr><th scope="col">#</th><th scope="col">Pseudo</th><th scope="col">Niveau</th><th scope="col">Combattre</th></tr></thead>';
		for(key of Object.getOwnPropertyNames(inf.players)) {
			table +='<tbody> ' +
                  '  <tr>' +
                  '    <th scope="row">#</th>' +
                  '    <td>'+players[key].pseudo+'</td>' +
                  '    <td>'+players[key].niveau+'</td>' +
                  '    <td><button class="btn btn-danger fight-button" data-id="'+players[key].id+'">Combattre !</button></td>' +
                  '  </tr>' +
                  '</tbody>';

		}
		$("#playerList").html(table);
		$("#playerCount").text(data.val);
	});


	$("#playerList").on("click", "button.fight-button", function() {
		let idPlayer = $(this).attr("data-id");
		socket.emit('defi', {playerId : idPlayer});
		$(this).parent().append("<i>Joueur défié</i>");
		$(this).css("display", "none");
	})

	socket.on('defi', function (data) {
		$("#messageTitle").text("Un joueur vous défie !");
		$("#messageContent").html("Le joueur <b>"+data.challenger.pseudo+"</b> de niveau <b>"+data.challenger.niveau+"</b> souhaite vous défier. <br/><hr>Acceptez vous le défi ?");
		$("#messageTrue").text("Sah quel plaisir !");
		$("#messageFalse").text("Non, quelle horreur !");
		$("#modalBtn").click();
		console.log(data)
	});

});