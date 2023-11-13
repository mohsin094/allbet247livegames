<template>
	<div class="row">
    <Sidebar v-if="!this.isMobile" />
    <div class="col-md-10 col-xl-10 px-sm-2 px-0" :style="this.isMobile ? 'padding-top:120px' : ''">
      <div class="main-wrapper min-vh-100">
        <div class="accordion" id="accordion">
          <div v-for="announcement in announcements" class="accordion-item">
            <h2 class="accordion-header" :id="'heading'+announcement._id">
              <button class="accordion-button bg-dark-gradient" type="button" data-bs-toggle="collapse" :data-bs-target="'#id'+announcement._id" aria-expanded="true" :aria-controls="'collapse'+announcement._id">
            {{announcement.title}}
              </button>
            </h2>
            <div :id="'id'+announcement._id" class="accordion-collapse collapse" :aria-labelledby="'heading'+announcement._id" data-bs-parent="#accordion">
              <div class="accordion-body">
                {{announcement.text_body}}
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
         announcements:[]
        }
      },
      mounted(){
        this.getannouncement()
      },
      methods:{
        getannouncement(){
          const url = import.meta.env.VITE_BACKEND_BASE_URL+'/announcement/default/list'
          let instance = this
          this.$axios.get(url).then(function(response){
            let data = response.data.params
            if(data.length > 0){
              instance.announcements = data
            }
          })
        }
      }
  }
</script>