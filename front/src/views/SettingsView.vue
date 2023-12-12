<template>
	<div class="row">
		<div class="col-md-4 mb-2">
			<div class="bg-dark-gradient text-center p-4 simple-page">
				<label>ChANGE YOUR AVATAR</label>
				<hr class="hr-text"/>

				<img :src="'/assets/images/avatars/'+$user.data.avatar+'.png'" style="width:100px"/>
				<p>{{$user.data.email}}</p>
				
				<div class="input-wrapper file-input text-center position-relative mt-3">
				  
	              <a href="#" class="d-block" data-bs-toggle="modal" data-bs-target="#avatars" style="width:100%;height:100%">
	                <img src="@/assets/icons/image-icon.png" style="width:35px"/>
	              </a>
	            </div>
	        </div>
		</div>
		<div class="col-md-4 mb-2">
			<div class="bg-dark-gradient text-center p-4 simple-page">
				<h6>CHANGE YOUR PASSWORD</h6>
				<hr class="hr-text"/>
				<div class="position-relative input-wrapper">
	                <span class="input-icon input-icon-left position-absolute">
	                  <span class=" material-symbols-outlined">key</span>
	                </span>
	                 <FormKit
	                    v-model="OldPass"
	                    :type="showOldPass ? 'text' : 'password'"
	                    name="password"
	                    validation="required"
	                    placeholder="Current Password"
	                  />
	                  <span class="input-icon input-icon-right position-absolute" @click="showOldPass = !showOldPass">
	                    <span class=" material-symbols-outlined">{{showOldPass ? 'visibility_off' : 'visibility'}}</span>
	                  </span>
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
	                    placeholder="New Password"
	                  />
	                  <span class="input-icon input-icon-right position-absolute" @click="showPass = !showPass">
	                    <span class=" material-symbols-outlined">{{showPass ? 'visibility_off' : 'visibility'}}</span>
	                  </span>
	              </div>
	            </FormKit>
	            <div class="row justify-content-center">
	            	<button type="button" class="btn btn-golden text-dark login-btn">Change Password</button>
	            </div>
			</div>
		</div>
		<div class="col-md-4 mb-2">
			<div class="bg-dark-gradient text-center p-4 simple-page">
				<h6>JOIN THE NEWSLETTER</h6>
				<hr class="hr-text"/>
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
		        <div class="row justify-content-center">
	            	<button type="button" class="btn btn-golden text-dark login-btn">Subscribe</button>
	            </div>
			</div>
		</div>
	</div>
</template>
<script>
	import Sidebar from '@/components/Sidebar.vue';
	export default{
		components:{
			Sidebar
		},
		data(){
			return{
				showPass:false,
				showOldPass:false,
				password:'',
				oldPass:''
			}
		}
	}
</script>