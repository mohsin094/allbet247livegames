<template>
	<div class="row">
		<div class="col-md-12 col-xl-12 board-header position-relative" style='height:55px'>
			<div class="row">
				<div v-if="playerWhite != undefined" class="col-md-2 col-xl-2">
					<div class="border-golden card-profile card-profile-left">
						<div class="profile-bg bg-blue bg-blue-shadow bg-blue bg-blue-shadow">
							<img class="avatar-img" :src="baseUrl+'/assets/images/avatars/'+ playerWhite.avatar +'.png'" />
						</div>
					</div>
					<span class="position-absolute bheader-profile-name-left card-profile-name">{{playerWhite.public_name}}</span>
					<span class="position-absolute bheader-user-level">LVL.{{playerWhite.lvl}}</span>
				</div>
				<div v-if="playerWhite != undefined" class="col-md-1 col-xl-1 text-center">
					<i class="material-symbols-outlined text-golden-gradient float-start mr-1">
						timelapse
					</i>
					<span class="float-start"> {{playerWhite.time}}</span>
				</div>
				<div class="col-md-3 col-xl-3">
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
				<!-- <div class="col-md-2 col-xl-2 text-center">
					<i class="material-symbols-outlined text-golden-gradient float-start">workspace_premium</i>
					<span class="float-start">Prize:1400</span>
				</div> -->
				<div class="col-md-2 col-xl-2 text-center">
					<i class="material-symbols-outlined text-golden-gradient float-start mr-2">currency_exchange</i>
					<span class="float-start ml-2"> Stake: {{match.stake}}</span>
				</div>
				<div v-if="playerBlack != undefined" class="col-md-1 col-xl-1 text-center">
					<i class="material-symbols-outlined text-golden-gradient float-start mr-1">
						timelapse
					</i>
					<span class="float-start"> {{playerBlack.time}}</span>
				</div>
				<div v-if="playerBlack != undefined" class="col-md-2 col-xl-2" dir="rtl">
					<div class="border-golden card-profile card-profile-right">
						<div class=" profile-bg bg-blue bg-blue-shadow bg-red bg-red-shadow">
							<img class="avatar-img" :src="baseUrl+'/assets/images/avatars/'+ playerBlack.avatar +'.png'" />
						</div>
					</div>
					<span class="position-absolute bheader-profile-name-right card-profile-name">{{playerBlack.public_name }}</span>
					<span class="position-absolute bheader-user-level">LVL.{{playerBlack.lvl}}</span>
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