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
	},

	Lolis : {
		"1" : {
			id : 1,
			name : "Shiro",
			img : "/images/lolis/shiro.jpg",
			type : "fairy",
			base_PV : 30,
			base_ATQ : 10,
			base_DEF : 10,
			base_Vit : 10
		}
	},

	StartupLolis : ["1"]
	
}

module.exports = Config; 