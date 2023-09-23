import log from '#components/Log'
import fs from 'fs';

export const SERVER = {
    HTTP: 'http',
    SOCKET: 'socket'
}

export const DB = {
    REDIS: 'redis'
}
export default {
    debug: false,
    db: {}, // databases configs
    fs: {}, // file system configs
    server: {}, // servers configs
    params: {}, // general params
    session: {},
    raw: '', // raw config
    load: function(confPath) {
        this.raw = JSON.parse(fs.readFileSync(confPath).toString());
        this.parse();
    },
    parse: function() {
        this.db = this.raw.db;
        this.fs = this.raw.fs;
        this.server = this.raw.server;
        this.params = this.raw.params;
        this.session = this.raw.session;
    },
    getParam: function(paramName) {
        if(Object.hasOwn(this.params, paramName)) {
            return this.params[paramName];
        } else {
            log.console(`Cannot Find ${paramName} In params Config`);
        }
    },
    getDb: function(dbName) {
        if(Object.hasOwn(this.db, dbName)) {
            return this.db[dbName];
        } else {
            log.console(`Cannot Find ${dbname} In DB Config`);
        }
    },
    getFs: function() {
        return this.fs;
    },
    getServer: function(serverName) {
        if(Object.hasOwn(this.server, serverName)) {
            return this.server[serverName];
        } else {
            log.console(`Cannot Find ${serverName} In Server Config`);
        }
    }
}