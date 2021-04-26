class DB {
    constructor(db, Config) {
      this.db = db;
      this.Config = Config;
    }


    // GET
    async getPlayerByMail(mail) {
      let query = "SELECT * FROM players WHERE mail = ?";
      return this.doQueryParams(query, [mail]);
    }

    

    async getPlayerById(id) {
      let query = "SELECT * FROM players WHERE id = ?";
      return this.doQueryParams(query, [id]);
    }

    async getPlayerByToken(token) {
      let query = "SELECT * FROM players WHERE play_token = ?";
      return this.doQueryParams(query, [token]);
    }


    // STORE
    async storeNewPlayer(pseudo, mail, password) {
      let query = "INSERT INTO players (pseudo, mail, password, money, rank) VALUES (?, ?, ?, ?, ?)";
      return this.doQueryParams(query, [pseudo, mail, password, this.Config.Player.INITIAL_MONEY, this.Config.Player.PLAYER_RANK]);
    }

    async storeFirstLoli(loli_type, player_id, pv, atk, def, vit) {
      let query = "INSERT INTO lolis (loli_type, player_id, pv, atk, def, vit) VALUE (?, ?, ?, ?, ?, ?) ";
      let query2 = "UPDATE players SET tutorial = 2 WHERE id = ?";
      this.doQueryParams(query2, player_id);
      return this.doQueryParams(query, [loli_type, player_id, pv, atk, def, vit]);
    }

    async storePlayToken(token, id_player) {
      let query = "UPDATE players SET play_token = ? WHERE id = ?";
      return this.doQueryParams(query, [token, id_player]);
    }


    async doQuery(queryToDo) {
      let pro = new Promise((resolve,reject) => {
        let query = queryToDo;
        this.db.query(query, function (err, result) {
            if (err) throw err; 
            resolve(result);
        });
      })
      return pro.then((val) => {
        return val;
      })
    }


    async doQueryParams(queryToDo, array) {
      let pro = new Promise((resolve,reject) => {
        let query = queryToDo;
        this.db.query(query, array, function (err, result) {
            if (err) throw err; 
            resolve(result);
        });
      })
      return pro.then((val) => {
        return val;
      })
    }

}



module.exports = DB;

