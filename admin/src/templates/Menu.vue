<template>
	<!-- Menu -->
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme hide">
      <div class="app-brand demo">
        <a href="javascript:void(0)" class="app-brand-link">
          <span class="app-brand-logo demo">
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="#7367F0" />
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0" />
            </svg>
          </span>
          <span class="app-brand-text demo menu-text fw-bold">Admin Panel</span>
        </a>
        <a href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#layout-menu" aria-controls="layout-menu" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler layout-menu-toggle menu-link text-large ms-auto">
          <i class="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
          <i class="ti ti-x d-block d-xl-none ti-sm align-middle"></i>
        </a>
      </div>
      <div class="menu-inner-shadow"></div>
      <ul class="menu-inner py-1">
      	<!-- dashboard -->
	        <router-link
	        v-if="$user.data.role == 'admin'"
	        	:to="{name: 'dashboard'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-smart-home"></i>
	            <div>Dashboard</div>
	          </a>
	        </li>
		  </router-link>
		  <!-- users -->
		  <router-link
	        	:to="{name: 'users'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-users"></i>
	            <div>Users</div>
	          </a>
	        </li>
		  </router-link>
		  <!-- game -->
		  <router-link
		  
	        	:to="{name: 'games'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-dice-6"></i>
	            <div>Games</div>
	          </a>
	        </li>
		  </router-link>
		  <router-link
		  v-if="$user.data.role == 'admin'"
	        	:to="{name: 'gameStakes'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti-app-window"></i>
	            <div>Game Stakes</div>
	          </a>
	        </li>
		  </router-link>

		  <!-- financial -->
		  <router-link
		  
	        	:to="{name: 'financial'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-report-money"></i>
	            <div>Financial</div>
	          </a>
	        </li>
		  </router-link>
		  <router-link
		  
	        	:to="{name: 'agentActivityReport'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti-app-window"></i>
	            <div>Agents Activities Report</div>
	          </a>
	        </li>
		  </router-link>
		  <!-- announcement -->
		  <router-link
		  v-if="$user.data.role == 'admin'"
	        	:to="{name: 'announcements'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-speakerphone"></i>
	            <div>Announcements</div>
	          </a>
	        </li>
		  </router-link>
		  <!-- settings -->
		  <router-link
		  v-if="$user.data.role == 'admin'"
	        	:to="{name: 'settings'}"
			    v-bind="$props"
			    custom
			    v-slot="{ isActive, href, navigate }"
			  >
		    <li class="menu-item" :class="{active: isActive}">
	          <a v-bind="$attrs" :href="href" @click="navigate" class="menu-link">
	            <i class="menu-icon tf-icons ti ti-adjustments"></i>
	            <div>Settings</div>
	          </a>
	        </li>
		  </router-link>
      </ul>
    </aside>
    <!-- / Menu -->
</template>
<script>
import {reactive} from 'vue';
import {RouterLink} from 'vue-router';
export default {
	nheritAttrs: false,
	props: {
		...RouterLink
	},
	data()
	{
		return {
			route: 'dashboard'
		}
	}
}
</script>

<style>
.layout-menu {
	transform: initial !important;
}
</style>