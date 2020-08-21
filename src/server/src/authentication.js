const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { LDAPStrategy } = require('./authenticate-ldap')
const { expressOauth } = require('@feathersjs/authentication-oauth')








module.exports = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('ldap', new LDAPStrategy())



  app.use('/authentication', authentication)
  app.configure(expressOauth())

}
