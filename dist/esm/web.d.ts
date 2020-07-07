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
    getFeathersRef(): any;
    getListenPort(): Promise<any>;
}
declare const CapFeathersPlugin: CapFeathersPluginWeb;
export { CapFeathersPlugin };
