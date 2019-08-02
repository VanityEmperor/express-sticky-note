var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite') 
});

var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid:{
    type: Sequelize.STRING
  }
})
/* Note.sync().then(function () {
  Note.create({text: 'hello world',uid:43816931})
}).then(function(){
  Note.findAll({raw:true}).then(function(notes){//查询
    console.log(notes)
  })
}) */
// Note.sync({force:true})

module.exports = Note;
