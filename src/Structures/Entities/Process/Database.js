const { Sequelize } = require("sequelize");

class Database {

    constructor(type){
        let supportedDatabases = ["postgres", "sqlite", "mysql", "mssql"];
        if(!supportedDatabases.includes(type)) throw new Error("Invalid Database");
        this.db = new Sequelize({
            database: type,
            username: "",
            password: "" ,
            options: {

            }
        });
    }

}