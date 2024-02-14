import * as dotenv from 'dotenv';
import conf from '#components/ConfProvider';
import path from '#components/Path';
dotenv.config();


export default {
    env_prod: 'prod',
    env_dev: 'dev',
    env_test: 'test',
    test: 'test',
    init: function() {

        conf.debug = process.env.DEBUG;
console.log(process.env.ENV);
        switch(process.env.ENV) {
            case this.env_prod:
                conf.load(path.join(path.basePath, 'src', 'configs')+ '/configs.json');
                break;
            case this.env_test:
                conf.load(path.join(path.basePath, 'src', 'configs')+ '/configs.test.json');
                break;
            case this.env_dev:
                conf.load(path.join(path.basePath, 'src', 'configs')+ '/configs.local.json');
                break;
            default:
                conf.load(path.join(path.basePath, 'src', 'configs')+ '/configs.local.json');
        }
    }
}
