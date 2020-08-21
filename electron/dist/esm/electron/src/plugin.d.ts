import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
export declare class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
    app: any;
    feathersPath: any;
    feathersRef: any;
    port: number;
    start: boolean;
    init: boolean;
    NodeFS: any;
    RemoteRef: any;
    Path: any;
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    setFeathersPath(chemin: string): Promise<void>;
    private hasFeathers;
    startServer(): Promise<void>;
    stopServer(): Promise<void>;
    getListenPort(): Promise<number>;
    isStart(): Promise<boolean>;
    getFeathersRef(): any;
    setConfig(param: string, value: any): Promise<void>;
    getConfig(param: string): Promise<void>;
    changePort(port: number): Promise<void>;
}
declare const CapFeathersPlugin: CapFeathersPluginWeb;
export { CapFeathersPlugin };
