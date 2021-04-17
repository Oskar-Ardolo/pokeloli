const PORT = 3000;
const Config = require("./config.js");
const mysql = require('mysql');
var Player = require("./class/player.class.js");
var DB = require("./class/bdd.js");
var express = require('express');
var session = require('express-session');
var favicon = require('serve-favicon');
var server = require('http').Server(app);
var io = require('socket.io')(server);


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.jpg'));



console.log("Money = "+ Config.Player.INITIAL_MONEY);

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

	(async function() {
		let resu = await DBModel.storeNewPlayer("pseudo", "lol@lol.fr", "lalala");
    	console.log(resu);

	})();
    
    // GET
   	app.get("/", (req, res) => {
		res.render("WL/home.ejs");
	});

	app.get("/login", (req, res) => {
		res.render("WL/login.ejs");
	});

	app.get("/register", (req, res) => {
		res.render("WL/register.ejs");
	});

	// POST
	app.post("/register", (req, res) => {

		res.render("WL/register.ejs");
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