const PORT = 3000;
const Config = require("./config.js");
const mysql = require('mysql');
const crypto = require('crypto');
var Player = require("./class/player.class.js");
var DB = require("./class/bdd.js");
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var server = require('http').Server(app);
var io = require('socket.io')(server);


var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.jpg'));
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({  
  extended: true
})); 
app.use(session({
  secret: 'jojofags suck really hard',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const db = mysql.createConnection({
   host: Config.DB.HOST,
   user: Config.DB.USER,
   password: Config.DB.PASSWORD,
   database : Config.DB.DATABASE
 });

  db.connect(function(err) {
	if (err) throw err;
	console.log("Connexion base de données MySQL : OK.");
    let DBModel = new DB(db, Config);


    
    // GET
   	app.get("/", (req, res) => {
   		(async function() {
	   		if(req.session.login == 1) {
	   			let playerDB = await DBModel.getPlayerById(req.session.player.id)
	   			let player = new Player(playerDB[0]);
	   			res.render("LD/home.ejs", {player : player.player})
	   		} else {
	   			res.render("WL/home.ejs");
	   		}
   		})();
	});
	// GET
   	app.get("/professeur-loli", (req, res) => {
   		(async function() {
	   		if(req.session.login == 1) {
	   			let playerDB = await DBModel.getPlayerById(req.session.player.id)
	   			let player = new Player(playerDB[0]);

	   			if(player.getTutorial() == 1) {
	   				let StartupLolis = Config.StartupLolis;
	   				let lolis = [];
	   				for(start of StartupLolis) {
	   					lolis.push(Config.Lolis[start])
	   				}

	   				res.render("LD/professeur-loli.ejs", {player : player.player, lolis : lolis})
	   			} else {
	   				res.redirect("/")
	   			}
	   			
	   		} else {
	   			res.redirect("/login")
	   		}
   		})();
	});

	app.get("/login", (req, res) => {
		res.render("WL/login.ejs");
	});

	app.get("/register", (req, res) => {
		res.render("WL/register.ejs");
	});

	app.get("/logout", (req, res) => {
		req.session.destroy();
		req.session = null;
		res.render("WL/login.ejs");
	});

	app.get("/error", (req, res) => {
		res.render("error.ejs");
	});

	// FIRST LOLI 
	app.get("/professeur-loli/choice/:id", (req, res) => {
   		(async function() {
	   		if(req.session.login == 1) {
	   			let errorMessages = []
	   			let playerDB = await DBModel.getPlayerById(req.session.player.id)
	   			let player = new Player(playerDB[0]);
	   			if(player.getTutorial() == 1) {
	   				let choice = req.params.id;

		   			// VERIFICATIONS
		   			if(!Config.StartupLolis.includes(choice)) {
		   				res.redirect("/error");
		   				return;
		   			}

		   			let loliChoice = Config.Lolis[choice];

		 			let insertLoli = await DBModel.storeFirstLoli(loliChoice.id, player.getId(), loliChoice.base_PV, loliChoice.base_ATQ, loliChoice.base_DEF, loliChoice.base_Vit);

	   				res.redirect("/professeur-loli")
		   		

	   			} else {
	   				res.redirect("/error")
	   				return;
	   			} // END IF NOT PLAYER.getTutorial == 1

	   		} else { // END IF NOT LOGGED
	   			res.redirect("/login")
	   			return;
	   		}
   		})();
	});


	// INSCRIPTION
	app.post("/register", (req, res) => {
		let errorMessages = [];

		let pseudo = req.body.pseudo;
		let mail = req.body.mail;
		let password = req.body.password;
		let password2 = req.body.password2;

		if(!Config.emailRegexp.test(mail)) errorMessages.push("L'adresse email n'est pas correctement formatée.");
		if(password != password2) errorMessages.push("Les mots de passe de correspondent pas.");
		if(password.length < 6) errorMessages.push("Le mot de passe doit faire au moins 6 caractères.");

		if(errorMessages.length > 0) {
			res.render("WL/register.ejs", {error : errorMessages, pseudo : pseudo, mail : mail});
		} else {
			let passwordEncrypted = crypto.createHmac('sha256', req.body.password)
		               .update('jojofags suck')
		               .digest('hex');

		    
		    (async function() {
				let newPlayer = await DBModel.storeNewPlayer(pseudo, mail.toLowerCase(), passwordEncrypted);
		    	console.log(newPlayer);
			})();

		    res.render("WL/register.ejs", {success : "Votre inscription est terminée. Veillez vous connecter pour commencer votre aventure."} );
		}
	});

	// LOGIN
	app.post("/login", (req, res) => {
		(async function() {
			let errorMessages = [];

			let mail = req.body.mail;
			let password = req.body.password;
			let passwordEncrypted = crypto.createHmac('sha256', req.body.password)
			               .update('jojofags suck')
			               .digest('hex');

			
			let player = await DBModel.getPlayerByMail(mail);
			if(player.length == 1) {
				if(player[0].password == passwordEncrypted) {
					req.session.login = 1;
					req.session.player = new Player(player[0]);
					req.session.player = req.session.player.player
					req.session.save();
					res.redirect('/');
				} else {
					errorMessages.push("Votre mot de passe n'est pas bon, veuillez revoir votre saisie.")
				}
			} else {
				errorMessages.push("Le compte n'existe pas, veuillez revoir votre saisie.")
			}
			
			if(errorMessages.length > 0) {
				res.render("WL/login.ejs", {error : errorMessages, mail : mail});
			} else {
				
			}
		})();

	});

	// LAST ROOT ERROR
	app.get('*', function(req, res) {
	    res.redirect('/error');
	});

 });



	



// ==============================================
// =											=
// =			Combat & Matchmaking			=						
// =			Powered by Socket.io			=
// =											=
// ==============================================


io.on('connection', function (socket) {
	console.log('new one');
	socket.on('message', function(data) {
		console.log(data);
		io.sockets.emit("message", {pseudo : data.pseudo, message : data.message});
	});
});

server.listen(8080);
app.listen(PORT);
console.log("Server startup : OK")
console.log("Server running : http://localhost:"+PORT+"/");