var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
// serveur featherjs with socket.io and rest services
const server = require('../server/src/server');
export class CapFeathersPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'CapFeathersPlugin',
            platforms: ['web']
        });
        this.feathersRef = null;
        this.feathersRef = new server();
    }
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return options;
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.startServer();
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.stopServer();
        });
    }
    changePort(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.changePort(port);
        });
    }
    isStart() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.feathersRef.isStart();
            return res;
        });
    }
    setConfig(param, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.app.set(param, value);
        });
    }
    getConfig(param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.app.get(param);
        });
    }
    getFeathersRef() {
        return this.feathersRef;
    }
    getListenPort() {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersRef.getListenPort();
        });
    }
}
const CapFeathersPlugin = new CapFeathersPluginWeb();
export { CapFeathersPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapFeathersPlugin);
//# sourceMappingURL=web.js.map