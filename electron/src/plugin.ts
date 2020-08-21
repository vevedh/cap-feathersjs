import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
const { remote } = require('electron');
const path = require('path');
const fsu = require('fs-jetpack');

export class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
  
  app:any = null;
  feathersPath: any = null;
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

  async setFeathersPath(chemin:string): Promise<void> {
    this.feathersPath = chemin;
    try {
      this.app = require(`${this.feathersPath}/src/app`);
    } catch (error) {
      console.error('Initialisation impossible le fichier src/app.js dois exister!!');
      this.init = false;
    }
    
    if ( fsu.exists(path.resolve(`${this.feathersPath}/src/app.js`)) === 'file' ) {
      console.log('Initialisation possible !');
      this.init = true;
    } else {
      console.error('Initialisation impossible le fichier src/app.js dois exister!!');
      this.init = false;
    }
    
  }

  private hasFeathers() {
    console.log('init server !');
    console.log('Path dir :',path.resolve(this.feathersPath))//'./server'));
    console.log('File dir :',fsu.exists(path.resolve(this.feathersPath)))//'./server')))
    this.init = false;
    if (fsu.exists(path.resolve(this.feathersPath)) === 'dir') {
      console.log('Implementaion de feathersjs possible !');
      if ( fsu.exists(path.resolve(`${this.feathersPath}/src/app.js`)) === 'file' ) {
        console.log('Initialisation possible !');
        this.init = true;
      } else {
        console.error('Initialisation impossible le fichier src/app.js dois exister!!')
      }
    }
    return this.init;
  }

  async startServer(): Promise<void> {
    if (this.init) {
      this.feathersRef = this.app.listen(this.app.get('port'));
      this.start = true;
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
  }

  async stopServer(): Promise<void> {
    if (this.init) {
      this.feathersRef.close();
      this.start = false
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
  }

  async getListenPort(): Promise<number> {
    if (this.init) {
      return this.app.get('port');
    } else {
      console.error('You must generate featherjs app with name server in electron folder!!')
    }
  }
  

  async isStart(): Promise<boolean> { 
    if (this.init) {   
      return this.start;
    } else {
      console.error('You must generate featherjs app with name server in electron folder!!')
    }
    
  }

  getFeathersRef(): any {
    return this.feathersRef;
  }


  async setConfig(param:string,value:any): Promise<void> {
    if (this.init) {
      this.app.set(param,value);
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
  }


  async getConfig(param:string): Promise<void> {
    if (this.hasFeathers()) {
      this.app.get(param);
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
  }

  async changePort(port: number): Promise<void> {
    if (this.hasFeathers()) {
      this.app.set('port',port);
    } else {
      console.log('You must generate featherjs app with name server in electron folder!!')
    }
    
    
  }

  

}

const CapFeathersPlugin = new CapFeathersPluginWeb();

export { CapFeathersPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapFeathersPlugin);
