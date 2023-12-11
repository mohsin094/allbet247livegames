<template>
  <!--Login Modal -->
  <div ref="loginModal" class="modal fade" id="login" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h1 class="modal-title fs-5" id="loginLabel">Login</h1>
            <div class="position-relative input-wrapper">
              <span class="input-icon input-icon-left position-absolute">
                <span class=" material-symbols-outlined">mail</span>
              </span>
              <FormKit class="position-absolute"
                  v-model="username"
                  type="text"
                  name="email"
                  placeholder="Email"
                  validation="required|email"
                />
            </div>
            <div class="position-relative input-wrapper">
              <span class="input-icon input-icon-left position-absolute">
                <span class=" material-symbols-outlined">key</span>
              </span>
              <FormKit class="position-absolute"
                  v-model="password"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                  placeholder="Password"
                  validation="required"
                />
              <span class="input-icon input-icon-right position-absolute" @click="showPass = !showPass">
                <span class=" material-symbols-outlined">{{showPass ? 'visibility_off' : 'visibility'}}</span>
              </span>
            </div>

            <ul>
              <li v-for="error in errors"><span class="text-danger">{{error}}</span></li>
            </ul>
            <a href="#" class="position-absolute text-gray" id="forget-link">Forgot password</a>
            <button type="button" class="btn btn-golden text-dark login-btn mt-5" @click="doLogin()">Login</button>
            <hr class="hr-text" data-content="Or"/>
            <div class="container d-flex align-items-center justify-content-center">
            <ul class="social-links d-flex flex-row" id="footer">
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/discord.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/fb.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/google.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box" style="width:48px">
                  <img src="@/assets/icons/apple.svg">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer text-center">
          <p class="text-gray">Not a member?</p><a data-bs-toggle="modal" data-bs-target="#signup" href="#">Sign up</a>
        </div>
      </div>
    </div>
  </div>

  <!-- sign up modal -->
  <div class="modal fade" id="signup" tabindex="-1" aria-labelledby="signupLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h1 class="modal-title fs-5" id="loginLabel">Sign up</h1>
            <div class="position-relative input-wrapper">
              <span class="input-icon input-icon-left position-absolute">
                <span class=" material-symbols-outlined">person</span>
              </span>
              <FormKit class="position-absolute"
                  v-model = "username"
                  type="text"
                  name="id"
                  placeholder="Enter Player Name-ID"
                  validation="required"
                  validation-label="Username"
                />
            </div>
            <div class="position-relative input-wrapper">
              <span class="input-icon input-icon-left position-absolute">
                <span class=" material-symbols-outlined">mail</span>
              </span>
              <FormKit class="position-absolute"
                  v-model="email"
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  validation="required|email"
                />
            </div>
            <FormKit type="group">
              <div class="position-relative input-wrapper">
                <span class="input-icon input-icon-left position-absolute">
                  <span class=" material-symbols-outlined">key</span>
                </span>
                 <FormKit
                    v-model="password"
                    :type="showPass ? 'text' : 'password'"
                    name="password"
                    validation="required"
                    placeholder="Password"
                  />
                  <span class="input-icon input-icon-right position-absolute" @click="showPass = !showPass">
                    <span class=" material-symbols-outlined">{{showPass ? 'visibility_off' : 'visibility'}}</span>
                  </span>
              </div>
              <div class="position-relative input-wrapper">
                <span class="input-icon input-icon-left position-absolute">
                  <span class=" material-symbols-outlined">key</span>
                </span>
                <FormKit
                    v-model="confirmPass"
                    :type="showConfPass ? 'text' : 'password'"
                    name="password_confirm"
                    validation="required|confirm"
                    validation-label="Confirmation"
                    placeholder="Confirm password"
                  />
                  <span class="input-icon input-icon-right position-absolute" @click="showConfPass = !showConfPass">
                    <span class=" material-symbols-outlined">{{showConfPass ? 'visibility_off' : 'visibility'}}</span>
                  </span>
              </div>
            </FormKit>
            <div class="input-wrapper file-input text-center">
              <a href="#" class="d-block" data-bs-toggle="modal" data-bs-target="#avatars" style="width:100%;height:100%">
                <img v-if="avatar == ''" src="@/assets/icons/image-icon.png" style="width:40px"/>
                <img v-else :src="baseUrl+'/assets/images/avatars/'+avatar+'.png'" style="width:40px"/>
              </a>
              <!-- <img v-if="avatar != null" /> -->
            </div>
             <FormKit
                type="checkbox"
                label="I accept every danger in this game"
                label-class="$reset label"
                name="terms"
                :value="true"
                validation="accepted"
                validation-visibility="dirty"
              />
            <button type="button" class="btn btn-golden text-dark login-btn mt-5" @click="register()">Sign up</button>
            <hr class="hr-text" data-content="Or"/>
            <!-- <div class="container d-flex align-items-center justify-content-center">
            <ul class="social-links d-flex flex-row" id="footer">
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/discord.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/fb.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box">
                  <img src="@/assets/icons/google.svg">
                </div>
              </li>
              <li class="nav-item">
                <div class="header-box" style="width:48px">
                  <img src="@/assets/icons/apple.svg">
                </div>
              </li>
            </ul>
          </div> -->
        </div>
        <div class="modal-footer text-center">
          <p class="text-gray">Already have an account?</p><a data-bs-toggle="modal" data-bs-target="#login" href="#">Login</a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- avatars -->
  <div class="modal fade" id="avatars" tabindex="-1" aria-labelledby="avatarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="modal-title">
              <h3>Choose your avatar</h3>
            </div>
            <div class="row">
              <div class="col-md-2 mb-3" v-for="n in 45">
                <img :class="{'bordered-avatar' : $user.data.avatar == n}" :src="baseUrl+'/assets/images/avatars/'+n+'.png'" :id="n" style="width:64px" @click="selectAvatar(n)"/>
              </div>
            </div>
            
          </div>
          <div class="modal-footer">
            <button v-if="$user.data.isGuest" id="select" class="btn btn-default btn-golden" disabled="disabled" data-bs-target="#signup" data-bs-toggle="modal" data-bs-dismiss="modal">
              Select
            </button>
        </div>
      </div>
  </div>
</div>
</template>
<script>
  import { Modal } from 'bootstrap';
  export default{
    data(){
      return {
        showPass:false,
        showConfPass:false,
        username:"",
        email:"",
        password:"",
        confirmPass:"",
        avatar:'',
        errors:[],
        baseUrl: import.meta.env.VITE_BASE_URL
      }
    },
    methods:{
      doLogin:function(){
        let instance = this
        let url = import.meta.env.VITE_BACKEND_BASE_URL+'/user/auth/login'
        let isloginUrl = import.meta.env.VITE_BACKEND_BASE_URL+'/user/auth/is-login'
        this.$axios.post(url,{
          username: instance.username,
          password: instance.password
        }).then((response) => {
          console.log(response.data.params)
          response = response.data
          if(response.result){
            var modalEl = document.getElementById('login');
            var modal = Modal.getInstance(modalEl)
            modal.hide();
            instance.$user.doLogin(response.params)
            let data = JSON.stringify(response.params)
            instance.$storage.setItem("data", data);
            setInterval(function () {
            instance.$axios.get(isloginUrl).then(function(res){
                res = res.data.result
                if(res){
                  data = JSON.parse(instance.$storage.getItem("data"));
                  instance.$user.doLogin(data)
                   
                }else{
                  instance.$user.doLogout()
                }
              })
            }, 30000);
          }else{
            instance.errors = response.error
          }
        })
      },
      register:function(){
        let url = import.meta.env.VITE_BACKEND_BASE_URL+'/user/auth/register'
        this.$axios.post(url,{
          email: this.email,
          password: this.password,
          password_repeat:this.confirmPass,
          avatar:this.$user.data.avatar
        }).then((response) =>{
          response = response.data
          if(response.result){
            var modalEl = document.getElementById('signup');
            var modal = Modal.getInstance(modalEl)
            modal.hide()
          }
        })
      },
      selectAvatar(n){
        this.$user.data.avatar = n.toString();
        this.avatar = n.toString();
        document.getElementById(n).classList.add("bordered-avatar");
        document.getElementById("select").disabled = false; 
      },
      // openAvatars:function(){
      //   var modalEl = document.getElementById('login');
      //   var modal = Modal.getInstance(modalEl)
      //   console.log(modal)
      //   // modal.show()
      // }
    }
  }
</script>
<style>
  .label{
    color: #5D6879;
    font-size: 12px;
    position: absolute;
    left: 125px;
  }
  .formkit-input[type="checkbox"]{
    float: left;
    height: 16px;
    width: 16px;
    position: absolute;
    left: 95px;
    accent-color:#5D6879;
  }
</style>