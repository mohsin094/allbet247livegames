<template>
	<div class="row">
		<div class="col-md-12 col-xl-12 board-header position-relative" style='height:55px'>
			<div class="row">
				<div v-if="playerWhite != undefined" class="col-md-1 col-xl-1 position-relative">
					<span class="material-symbols-rounded position-absolute flag online-flag flag-left">
						radio_button_unchecked
					</span>
					<div class="border-golden card-profile card-profile-left">
						<div class="profile-bg bg-blue bg-blue-shadow bg-blue bg-blue-shadow">
							<img class="avatar-img" :src="baseUrl+'/assets/images/avatars/'+ playerWhite.avatar +'.png'" />
						</div>

					</div>
					<span class="position-absolute bheader-profile-name-left card-profile-name">{{playerWhite.public_name}}</span>
					<span class="position-absolute bheader-user-level user-level-left">LVL.{{playerWhite.lvl}}</span>

				</div>
				<div v-if="playerWhite != undefined" class="col-md-1 col-xl-1 txt-icon">
					<strong class="float-end"> {{playerWhite.time}}</strong>
					<i class="material-symbols-outlined text-golden-gradient float-end me-1">
						timelapse
					</i>
					
				</div>
				
				<div class="col-md-2 col-xl-2 txt-icon">
					<p class="float-end">Prize:1400</p>
					<span class="material-symbols-outlined text-golden-gradient float-end">workspace_premium</span>
				</div>
				<div class="col-md-4 col-xl-4">
					<ul class="list-group-horizontal card-star text-center">
						<li><i class="material-symbols-rounded text-grass">star</i></li>
						<li><i class="material-symbols-rounded text-grass">star</i></li>
						<li><i class="material-symbols-rounded text-red">star</i></li>
						<li><i class="material-symbols-rounded text-disabled">star</i></li>
						<li><i class="material-symbols-rounded text-disabled">star</i></li>
						<li><i class="material-symbols-rounded text-disabled">star</i></li>
						<li><i class="material-symbols-rounded text-disabled">star</i></li>
					</ul>
				</div>
				<div class="col-md-2 col-xl-2 txt-icon">
					<span class="material-symbols-outlined text-golden-gradient float-start me-2">currency_exchange</span>
					<p class="float-start ml-2"> Stake:{{match.stake}}1000</p>
				</div>
				<div v-if="playerBlack != undefined" class="col-md-1 col-xl-1 txt-icon">
					<strong class="float-start large-text"> {{playerBlack.time}}</strong>
					<i class="material-symbols-outlined text-golden-gradient float-start ms-1">
						timelapse
					</i>
				</div>
				<div v-if="playerBlack != undefined" class="col-md-1 col-xl-1">
					<span class="material-symbols-rounded text-disable position-absolute flag offline-flag flag-right">
						radio_button_unchecked
					</span>
					<div class="border-golden card-profile card-profile-right float-end">
						<div class=" profile-bg bg-blue bg-blue-shadow bg-red bg-red-shadow">
							<img class="avatar-img" :src="baseUrl+'/assets/images/avatars/'+ playerBlack.avatar +'.png'" />
						</div>
					</div>
					<span class="position-absolute bheader-profile-name-right card-profile-name">{{playerBlack.public_name }}</span>
					<span class="position-absolute bheader-user-level user-level-right">LVL.{{playerBlack.lvl}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default
{
	props: ['match', 'playerBlack', 'playerWhite'],
	data() {
		return {
			baseUrl: import.meta.env.VITE_BASE_URL
		}
	}
}
</script>