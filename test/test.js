var path = require('path');
var sql = require('../index.js')();
var db = sql.config(path.join(__dirname, "config.js")).table(path.join(__dirname, "tables.js")).connect();
console.log(db);
new db.Hospital()
	.query(function(qb) {
	qb.orderBy("id", "DESC").limit(1);
})
	.fetchAll().then(function(host) {
	console.log(host.toJSON());
}).
catch (function(err) {
	console.error(err);
});
