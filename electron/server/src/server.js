
const logger = require('./logger');
const  app = require('./app');

let serveur;
let isActive = false;


class server {

  constructor() {
    serveur = null;
  }


  startServer()  {
    serveur = app.listen(app.get('port'));
    isActive = true;
  }

  stopServer()  {
    if (serveur != null) {
      serveur.close();
      isActive = false;
    }
  }

  isStart()  {
    if (serveur != null) {
      isActive = true;
    }
    return isActive;
  }

  getListenPort()  {
    return app.get('port');
  }


  getFeathersRef()  {
    return app;
  }

  changePort(sport)  {
    app.set('port',sport);
  }


}

module.exports = server;
