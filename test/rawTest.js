var path = require('path');
var sql = require('../index.js')();
var db = sql.setConfig(path.join(__dirname, "config.js")).setTable(path.join(__dirname, "tables.js")).connect();
db.query('select * from hospital limit ?', [3]).then(function(resp) {
  var rows= resp[0];
  rows.forEach(function(row){
    console.log(row.location);
  });
});