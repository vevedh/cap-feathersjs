const { AuthenticationBaseStrategy } = require('@feathersjs/authentication');
const LdapAuth = require('ldapauth-fork');

class LDAPStrategy extends AuthenticationBaseStrategy {
  verifyConfiguration() {
    const config = this.configuration;
    ['url', 'bindDN','bindCredentials', 'searchBase', 'searchFilter'].forEach(prop => {
      if (typeof config[prop] !== 'string') {
        throw new Error(`'${this.name}' authentication strategy requires a '${prop}' setting`);
      }
    });
    console.log('Verif ok!!');
  }
  authenticate(data) {
    return new Promise((resolve, reject) => {
      const username = data.username;
      const password = data.password;

      console.log('Auth :',username,password);




      const auth = new LdapAuth(this.configuration);
      const name = this.name;
      const app = this.app;
      console.log('Config :',this.configuration);

      auth.authenticate(username, password,  ( err,user) => {
        console.log('Auth ok!',user);
        if (err) {
          reject('Invalid username or password; logon denied');
        } else {
          user['_id']=null;
          resolve({
            authentication: { strategy: name },
            user
          });
        }
      });
    });
  }
}
exports.LDAPStrategy = LDAPStrategy;
