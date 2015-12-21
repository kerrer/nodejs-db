/**
 * export MYSQL_DATABASE_CONNECTION="mysql://yixiang:123456@192.168.8.200/db_tongbing360?debug=true&charset=utf8"
 */
var path = require('path');
var fs = require('fs');
var config = require('config')();

function DbNode(sql) {
  var dbnode = {};

  dbnode.sql = sql || 'mysql2';
  
  dbnode.Config = function(conf) {
    this.configPath = conf;
    return this;
  };
  dbnode.Entities = function(path) {
    this.entitiesPath = path;
    return this;
  };
  dbnode.Debug = function(debug) {
    this.debug = debug;
    return this;
  };

  dbnode.connect = function() {
    var db = {
      VERSION: '0.8.1',
      TYPE: this.sql
    };
    
    var indebug = db.debug = this.debug || (process.env.NODE_ENV === "development" ? true : false);
    var entitiesPath = db.entitiesPath= this.entitiesPath || (path.join(process.env.CONF_DIR,"tables.js"));
     
    if (process.env.MYSQL_DATABASE_CONNECTION) {
      connection = process.env.MYSQL_DATABASE_CONNECTION;
    }else if(this.configPath && fs.existsSync(this.configPath)){
		var dbconf = JSON.parse(fs.readFileSync(path.resolve(this.configPath)));
		connection = {
			host:  dbconf.DB_HOST,
			user:  dbconf.DB_USER,
			password: dbconf.DB_PASSWORD,
			database: dbconf.DB_NAME,
			charset: 'utf8'
       };
	}else {
      connection = {
        host: process.env.DB_HOST || config.get('app').DB_HOST,
        user: process.env.DB_USER || config.get('app').DB_USER,
        password: process.env.DB_PASSWORD || config.get('app').DB_PASSWORD,
        database: process.env.DB_DATABASE || config.get('app').DB_NAME,
        charset: 'utf8'
      };
    }
    var knex = require('knex')({
      client: this.sql,
      connection: connection,
      debug: this.debug,
      pool: {
        min: 0,
        max: 7
      }
    });

    var bookshelf = require('bookshelf')(knex);

    var models = require(path.resolve(entitiesPath))(bookshelf);
    if (!models) {
      console.error("error db");
    }

    Object.keys(models).forEach(function(tab) {
      db[tab] = models[tab];
    });
    db.query = bookshelf.knex.raw;
    return db;
  };

  return dbnode;
}

// Finally, export `Bookshelf` to the world.
exports['default'] =   DbNode;
module.exports = exports['default'];
