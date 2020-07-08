declare module "@capacitor/core" {
  interface PluginRegistry {
    CapFeathersPlugin: CapFeathersPluginPlugin;
  }
}

export interface CapFeathersPluginPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
  startServer(): Promise<void>;
  stopServer(): Promise<void>;
  changePort(port: number): Promise<void>;
  isStart(): Promise<boolean>;
  getFeathersRef(): any;
  setConfig(param:string,value:any): Promise<void>;
  getConfig(param:string): Promise<void>;
  getListenPort(): Promise<number>;
}
