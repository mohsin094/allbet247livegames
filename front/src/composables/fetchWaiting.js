import axios from 'axios'
// import App from '@/App.vue'

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
import { reactive } from 'vue'
const waiting = {
  install: (app, options) => {
    app.config.globalProperties.$waiting = {
    data: reactive({
         list:[]
        
      }),
     getWaiting:function(){
      axios.get(import.meta.env.VITE_BACKEND_BASE_URL+"/game/default/get-waiting").then((res) => {
          this.list = res.data.params
          app.config.globalProperties.$waiting = this.list
          
          });
           return  this.list
      // setInterval(() => {
        
      //     },  2000);
     }
}
}
}
export default waiting    