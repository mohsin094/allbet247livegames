import { reactive } from 'vue'
const user = {
  install: (app, options) => {
    app.config.globalProperties.$user = {
      
      data: reactive({
          isGuest:true,
          id:"",
          email:"",
          avatar:"",
          role:"",
          status:"",
          balance:"",
          sessionId:""
        
      }),
      
        validate: function(data) {
            if(data.isGuest == false)
                this.doLogin(data)
        },
        doLogin:function(response){
          this.data.isGuest = false
          this.data.id = response.id
          this.data.email = response.email
          this.data.avatar = response.avatar
          this.data.role = response.role
          this.data.balance = response.balance
          this.data.sessionId = response.sessionId
        },
        doLogout:function(response){
          this.data.isGuest = true
          this.data.id = ""
          this.data.email = ""
          this.data.avatar = ""
          this.data.role = ""
          this.data.balance = ""
          this.data.sessionId = ""
        }
    }
  }
};

export default user
