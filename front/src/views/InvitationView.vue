<template>
	<div class="row justify-content-center">
		<div class="col-md-8 mb-2 ">
			<div class="bg-dark-gradient text-center p-4 simple-page">
				<label>INVITATION LINK</label>
				<hr class="hr-text"/>
				<div class="position-relative input-wrapper"  >
	                <span class="input-icon input-icon-left position-absolute">
	                  <span class=" material-symbols-outlined">link</span>
	                </span>
	                <input type="text" class="formkit-input" :value="invitationCode" id="link"/>
	                <span @click="copyLink" class="input-icon input-icon-right position-absolute" v-tooltip="tooltipText">
	                	<span  class="material-symbols-outlined" >content_copy</span>
	           		</span>
	            </div>
	        </div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			invitationCode:'',
			tooltipText:"Copy to clipboard",
		}
	},
	mounted()
	{
		this.fetchLink();
	},
	methods:{
		fetchLink() {
			const url = import.meta.env.VITE_BACKEND_BASE_URL+'/user/profile/get-invitation-link';
			this.$axios.get(url).then((res) => {
				res = res.data;
				if(res.result) {
					this.invitationCode = res.params.link
				}
			});
		},
		copyLink(){
			this.tooltipText = "Copied!"
			var copyText = document.getElementById("link");
			copyText.setSelectionRange(0, 99999); // For mobile devices
			navigator.clipboard.writeText(copyText.value);
		}
	}
}
</script>
<style>
	.tooltip {
  position: absolute;
  display: inline-block;
  border-bottom: 1px dotted black;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
/*  position: absolute;*/
  z-index: 999;
  top: -.5rem;
  right: -8rem;
}

.tooltiptext {
  
}
</style>