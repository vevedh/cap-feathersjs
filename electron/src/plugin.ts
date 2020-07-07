import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
const { remote } = require('electron');
const path = require('path');
// serveur featherjs with socket.io and rest services
const app = require('../server/src/app');
const fsu = require('fs-jetpack');

export class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
  
  feathersRef: any = null;
  port: number = null;
  start: boolean = false;
  init: boolean = false;
  NodeFS: any = null;
  RemoteRef: any = null;
  Path: any = null;

  constructor() {
    super({
      name: 'CapFeathersPlugin',
      platforms: ['electron']
    });
    this.NodeFS = require('fs-jetpack');
    this.Path = require('path');
    this.RemoteRef = remote;
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }

  private hasFeathers() {
    console.log('init server !');
    console.log('Path dir :',path.resolve('./server'));
    console.log('File dir :',fsu.exists(path.resolve('./server')))
    this.init = false;
    if (fsu.exists(path.resolve('./server')) === 'dir') {
      console.log('Implementaion de feathersjs possible !');
      if ( fsu.exists(path.resolve('./server/src/app.js')) === 'file' ) {
        console.log('Initialisation possible !');
        this.init = true;
      }
    }
    return this.init;
  }

  async startServer(): Promise<void> {
    if (this.hasFeathers()) {
      this.feathersRef = app.listen(app.get('port'));
      this.start = true;
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
  }

  async stopServer(): Promise<void> {
    if (this.hasFeathers()) {
      this.feathersRef.close();
      this.start = false
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
  }

  async getListenPort(): Promise<number> {
    return app.get('port');
  }
  

  async isStart(): Promise<boolean> {    
    return this.start;
    
  }

  getFeathersRef(): any {
    return this.feathersRef;
  }

  async changePort(port: number): Promise<void> {
    if (this.hasFeathers()) {
      app.set('port',port);
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
    
  }

  

}

const CapFeathersPlugin = new CapFeathersPluginWeb();

export { CapFeathersPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapFeathersPlugin);
