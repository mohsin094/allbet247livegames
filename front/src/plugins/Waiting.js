import axios from 'axios'
import App from '@/App.vue'

// import { reactive } from 'vue'
// export default function(){
// 		var waiting = reactive({})
// 		setInterval(() => {
// 	    	axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/get-waiting").then((res) => {
// 	    		// res = res.data.params;
// 	    		waiting = res.data.params
// 	    		return waiting;
//     	});
	    	
//     	},	2000);
    	
// }
import { reactive,createApp } from 'vue'
const app = createApp(App)
const waiting = {
  install: (app, options) => {
    app.config.globalProperties.$waiting = {
      
      data: reactive({
          waiting:[]
        
      }),
        getWaiting:function(){
        	setInterval(() => {
	    	axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/get-waiting").then((res) => {
	    		this.waiting = res.data.params
    	});
	    	
    	},	2000);
        }
    }
  }
};
export default waiting
