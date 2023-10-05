import Redis from "ioredis";
import conf,{DB} from "#components/ConfProvider";
import log from "#components/Log";

export default {
    clients: [],
    db: '',
    async newClient() {
        const r = new redisClient();
        await r.connect();
        this.clients.push(r);
        return r;
    }
}

export const redisClient = function() {
    this.client = '';

    this.connect = async function() {
        if(process.env.SINGLE_DB == 'true') {
            this.client = new Redis({
                host: conf.getDb(DB.REDIS).host,
                port: conf.getDb(DB.REDIS).port,
                username: conf.getDb(DB.REDIS).username,
                password: conf.getDb(DB.REDIS).password
            });
        }else {
            this.client = new Redis({
                host: conf.getDb(DB.REDIS).host,
                port: conf.getDb(DB.REDIS).port,
                username: conf.getDb(DB.REDIS).username,
                password: conf.getDb(DB.REDIS).password,
                sentinels: conf.getDb(DB.REDIS).sentinels,
                name: "mymaster",
                connectTimeout: 30,
                sentinelRetryStrategy: function(retries) {
                    return retries * 5 * 1000;
                }
            });
        }

        this.client.on('error', (err) => log.error('Redis Couldn\'t Connect', err));
        this.client.on('connect', () => log.info('Redis Connected Successfully'));
        this.client.on('end', () => log.info('Redis Disconnected'));
        this.client.on('close', () => log.info('Redis Disconnected'));
        return this.client;
    }
    this.disconnect = function() {
        if(this.client !== '') {
            this.client.disconnect();
        }
    }
}