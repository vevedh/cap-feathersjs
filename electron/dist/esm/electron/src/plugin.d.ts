import { WebPlugin } from '@capacitor/core';
import { CapFeathersPluginPlugin } from './definitions';
export declare class CapFeathersPluginWeb extends WebPlugin implements CapFeathersPluginPlugin {
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
