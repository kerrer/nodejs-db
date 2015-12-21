'use strict';

function db(book) {
  var bookshelf = {
    VERSION: '0.8.1'
  };

  var Hospital = book.Model.extend({
  tableName: 'fjtx_hospital'
  });
  bookshelf.Hospital = Hospital;

  return bookshelf;
}

// Constructor for a new `Bookshelf` object, it accepts
// an active `knex` instance and initializes the appropriate
// `Model` and `Collection` constructors for use in the current instance.
db.initialize = function (book) {
  return new db(book);
};

// Finally, export `Bookshelf` to the world.
exports['default'] = db;
module.exports = exports['default'];
