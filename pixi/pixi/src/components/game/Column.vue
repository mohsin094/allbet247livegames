<template>
	<ul class="column-holder" :style="{top: (data.index < 12) ? data.y+'px' : 'initial',bottom: (data.index > 11 ) ? data.y+'px' : 'initial' , left: data.x+'px'}" v-if="data">
		<li v-for="checker in data.container" :key="checker.index">
			<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.WHITE" src="@/assets/game/img/white-checker.png" />
			<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.BLACK" src="@/assets/game/img/black-checker.png" />
		</li>
	</ul>
</template>
<script>
	import {PLAYER_COLOR} from "@/extensions/backgammon/Player.js";
	export default {
		props: {
			data: {
				type: Object
			},
		},
		data() {
			return {
				playerColor: PLAYER_COLOR
			}
		},
		methods: {

		},
		created() {
		
		}
	}
</script>
<style>
	.column-holder {
		position: absolute;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>