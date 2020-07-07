import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
// serveur featherjs with socket.io and rest services
const server =  require('../server/src/server');


export class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
  
   feathersRef: any = null;

  constructor() {
    super({
      name: 'CapFeathersPlugin',
      platforms: ['web']
    });
    this.feathersRef = new server();
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }

  async startServer(): Promise<void> {
     this.feathersRef.startServer();
  }

  async stopServer(): Promise<void> {
     this.feathersRef.stopServer();
  }

  async changePort(port: number): Promise<void> {
    
     this.feathersRef.changePort(port);
    
  }

  async isStart(): Promise<any> {
    
    let res: any = await this.feathersRef.isStart();
    return res;
  }

  getFeathersRef(): any {
    return this.feathersRef;
  }

  async getListenPort(): Promise<any> {
     this.feathersRef.getListenPort();
  }

}

const CapFeathersPlugin = new CapFeathersPluginWeb();

export { CapFeathersPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapFeathersPlugin);
