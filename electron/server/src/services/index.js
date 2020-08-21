const users = require('./users/users.service.js')
const tables = require('./tables/tables.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(tables)
}
