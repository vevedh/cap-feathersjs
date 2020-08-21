import { __awaiter } from "tslib";
import { WebPlugin } from '@capacitor/core';
const { remote } = require('electron');
const path = require('path');
const fsu = require('fs-jetpack');
export class CapFeathersPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'CapFeathersPlugin',
            platforms: ['electron']
        });
        this.app = null;
        this.feathersPath = null;
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
    setFeathersPath(chemin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.feathersPath = chemin;
            try {
                this.app = require(`${this.feathersPath}/src/app`);
            }
            catch (error) {
                console.error('Initialisation impossible le fichier src/app.js dois exister!!');
                this.init = false;
            }
            if (fsu.exists(path.resolve(`${this.feathersPath}/src/app.js`)) === 'file') {
                console.log('Initialisation possible !');
                this.init = true;
            }
            else {
                console.error('Initialisation impossible le fichier src/app.js dois exister!!');
                this.init = false;
            }
        });
    }
    hasFeathers() {
        console.log('init server !');
        console.log('Path dir :', path.resolve(this.feathersPath)); //'./server'));
        console.log('File dir :', fsu.exists(path.resolve(this.feathersPath))); //'./server')))
        this.init = false;
        if (fsu.exists(path.resolve(this.feathersPath)) === 'dir') {
            console.log('Implementaion de feathersjs possible !');
            if (fsu.exists(path.resolve(`${this.feathersPath}/src/app.js`)) === 'file') {
                console.log('Initialisation possible !');
                this.init = true;
            }
            else {
                console.error('Initialisation impossible le fichier src/app.js dois exister!!');
            }
        }
        return this.init;
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.init) {
                this.feathersRef = this.app.listen(this.app.get('port'));
                this.start = true;
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    stopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.init) {
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
            if (this.init) {
                return this.app.get('port');
            }
            else {
                console.error('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    isStart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.init) {
                return this.start;
            }
            else {
                console.error('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    getFeathersRef() {
        return this.feathersRef;
    }
    setConfig(param, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.init) {
                this.app.set(param, value);
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    getConfig(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFeathers()) {
                this.app.get(param);
            }
            else {
                console.log('You must generate featherjs app with name server in electron folder!!');
            }
        });
    }
    changePort(port) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasFeathers()) {
                this.app.set('port', port);
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