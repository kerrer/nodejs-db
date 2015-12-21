var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '192.168.8.200',
    user     : 'yixiang',
    password : '123456',
    database : 'db_base_data',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var Hospital =bookshelf.Model.extend({
  tableName: 'hospital',
  doctors:function(){
      return this.hasMany(Doctor,'hospital_id');
  }
});
var Doctor =bookshelf.Model.extend( {
    tableName: 'hospital_doctor',
    hospital:function(){
        return this.belongsTo(Hospital);
    }
});
console.log(Hospital);
Hospital.where({id: 1}).fetch({withRelated: ['doctors']}).then(function(data) {
  console.log(JSON.stringify(data.related('doctors')));
});
