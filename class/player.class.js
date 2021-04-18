class Player {

	constructor(player) {
		this.player = player;
	}

	getPseudo() {
		return this.player.pseudo;
	}
	getMail() {
		return this.player.mail;
	}
	getMoney() {
		return this.player.money;
	}
	getRank() {
		return this.player.rank;
	}
	getTutorial() {
		return this.player.tutorial;
	}
	getId() {
		return this.player.id;
	}


}

module.exports = Player;