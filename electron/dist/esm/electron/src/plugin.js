import { __awaiter } from "tslib";
import { WebPlugin } from '@capacitor/core';
const { remote } = require('electron');
const path = require('path');
// serveur featherjs with socket.io and rest services
const app = require('../server/src/app');
const fsu = require('fs-jetpack');
export class CapFeathersPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'CapFeathersPlugin',
            platforms: ['electron']
        });
        this.feathersRef = null;
        this.port = null;
        this.start = false;
        this.init = false;
        this.NodeFS = null;
        this.RemoteRef = null;
        this.Path = null;
        this.NodeFS = require('fs-jetpack');
        this.Path = require('path');
        this.RemoteRef = remote;
    }
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return options;
        });
    }
    hasFeathers() {
        console.log('init server !');
        console.log('Path dir :', path.resolve('./server'));
        console.log('File dir :', fsu.exists(path.resolve('./server')));
        this.init = false;
        if (fsu.exists(path.resolve('./server')) === 'dir') {
            console.log('Implementaion de feathersjs possible !');
            if (fsu.exists(path.resolve('./server/src/app.js')) === 'file') {
                console.log('Initialisation possible !');
                this.init = true;
            }
        }
        return this.init;
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFeathers()) {
                this.feathersRef = app.listen(app.get('port'));
                this.start = true;
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFeathers()) {
                this.feathersRef.close();
                this.start = false;
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    getListenPort() {
        return __awaiter(this, void 0, void 0, function* () {
            return app.get('port');
        });
    }
    isStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.start;
        });
    }
    getFeathersRef() {
        return this.feathersRef;
    }
    changePort(port) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFeathers()) {
                app.set('port', port);
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
}
const CapFeathersPlugin = new CapFeathersPluginWeb();
export { CapFeathersPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapFeathersPlugin);
//# sourceMappingURL=plugin.js.map