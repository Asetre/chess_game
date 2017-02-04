var PORT = process.env.PORT || 8000;
var databaseURL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://user:test@ds131729.mlab.com:31729/chessusers'

module.exports = {PORT, databaseURL}
