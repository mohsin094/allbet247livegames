<template>
	<BackgammonHeader v-if="!this.isMobile"/>
	<div class="container-fluid">
		<div class="row">
		  <router-view></router-view>
		</div>	
	</div>
</template>
<script>
	import BackgammonHeader from '@/components/BackgammonHeader.vue';
	export default{
		components:{
			BackgammonHeader
		},
    mounted() {
      let isloginUrl = import.meta.env.VITE_BACKEND_BASE_URL+'/user/auth/is-login'
      const instance = this
      setInterval(function () {
        instance.$axios.get(isloginUrl).then(function(res){
            res = res.data
            if(res.result){
              instance.$user.update(res.params)
            }else{
              instance.$user.doLogout()
            }
          })
        }, 3000);
    }
	}
</script>