import { reactive } from 'vue'
const user = {
  install: (app, options) => {
    app.config.globalProperties.$notif = {
      
      data: reactive({
          show: false,
          class: '',
          text: ''
        
      }),
      
      show(text, type) {
        this.data.text = text;
        switch(type) {
        case 'success':
          this.data.class = 'alert-success';
          break;
        case 'danger':
          this.data.class = 'alert-danger';
          break;
        }
        this.data.show = true;
        setTimeout(() => {
          this.data.show = false;
        }, 3000);
      }
    }
  }
};

export default user
