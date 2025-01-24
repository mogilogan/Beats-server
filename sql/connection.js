const mysql = require("mysql");
const colors = require("colors");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating MySQL connection...".blue.bold);
      this.pool = mysql.createPool({
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        connectionLimit: 100,
        host: "ebeat-db-shefaoudeen1.h.aivencloud.com",
        user: "shefaoudeen123@gmail.com",
        password: "Shefa@1096",
        database: "Beats",
        port: 3306,
        multipleStatements: true,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
