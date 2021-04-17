const Config = {

	emailRegexp : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


	// DATABASE CONFIGURATION
	DB : {
		HOST : "localhost",
		USER : "root",
		PASSWORD : "",
		DATABASE : "pokeloli"
	},


	// PLAYER ACCOUNT CONFIGURATION
	Player : {
		INITIAL_MONEY : 1000,
		PLAYER_RANK : 1
	}
	
}

module.exports = Config; 