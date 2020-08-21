const { Tables } = require('./tables.class')
const hooks = require('./tables.hooks')

module.exports = function (app) {

  app.use('/tables', new Tables());



}
