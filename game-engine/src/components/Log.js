import {isEmpty} from 'lodash-es'
export default {
    warning: function(input, ...params) {
        params = ! isEmpty(params) ? params : '';
        console.warn(input, params);
    },
    error: function(input, ...params) {
        params = ! isEmpty(params) ? params : '';
        const err = new Error("Error Log");
        
        console.error(input, params);
        console.log(err.stack);
    },
    info: function(input, ...params) {
        params = ! isEmpty(params) ? params : '';
        console.info(input, params);
    },
    console: function(input, ...params) {

        params = ! isEmpty(params) ? params : '';
        console.log(input, params);
    },
    debug: function(input, ...params) {

        params = ! isEmpty(params) ? params : '';
        const err = new Error("Error Log");
        
        console.log(input, params);
        console.log(err.stack);
    }
}