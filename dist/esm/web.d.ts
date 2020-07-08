import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
export declare class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
    feathersRef: any;
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    startServer(): Promise<void>;
    stopServer(): Promise<void>;
    changePort(port: number): Promise<void>;
    isStart(): Promise<any>;
    setConfig(param: string, value: any): Promise<void>;
    getConfig(param: string): Promise<void>;
    getFeathersRef(): any;
    getListenPort(): Promise<any>;
}
declare const CapFeathersPlugin: CapFeathersPluginWeb;
export { CapFeathersPlugin };
