<template>
	<div class="row">
		<div class="col-md-10 col-xl-10 px-sm-2 px-0" :style="this.isMobile ? 'padding-top:120px' : ''">
			<div class="main-wrapper min-vh-100">
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
				                    type="password"
				                    name="password"
				                    validation="required"
				                    placeholder="Current Password"
				                  />
				                  <span class="input-icon input-icon-right position-absolute">
				                    <span class=" material-symbols-outlined">visibility</span>
				                  </span>
				            </div>
							<FormKit type="group">
				              <div class="position-relative input-wrapper">
				                <span class="input-icon input-icon-left position-absolute">
				                  <span class=" material-symbols-outlined">key</span>
				                </span>
				                 <FormKit
				                    v-model="password"
				                    type="password"
				                    name="password"
				                    validation="required"
				                    placeholder="New Password"
				                  />
				                  <span class="input-icon input-icon-right position-absolute">
				                    <span class=" material-symbols-outlined">visibility</span>
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
				password:'',
				oldPass:''
			}
		}
	}
</script>