<template>
	<ul class="column-holder" :class="{'top-column': (data.index < 12), 'bottom-column': (data.index > 11)}" :style="{top: (data.index < 12) ? data.y+'px' : 'initial',bottom: (data.index > 11 ) ? data.y+'px' : 'initial' , left: data.x+'px'}" v-if="data">
		<li :style="{'margin-top': (data.index < 12) ? '-50%' : 'initial','margin-bottom': (data.index > 11 ) ? '-50%' : 'initial'}" @click="$emit('touch', checker.index)" v-for="checker in data.container" :key="checker.index">
			<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.WHITE" src="@/assets/game/img/white-checker.png" />
			<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.BLACK" src="@/assets/game/img/black-checker.png" />
			<img v-show="checker.selected" :style="{width: checker.width+'px'}" class="checker checker-selected img-fluid" src="@/assets/game/img/checker-selected.png" />
			<img v-show="data.focus" :style="'width:'+checker.width+'px'" src="@/assets/game/img/column-selected.svg" class="column-selected" />
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
	.checker-selected {
		position: absolute;
		left: 0;
	}

	.column-holder {
		position: absolute;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.column-holder li {
		position: relative;
	}

	.top-column li:first-child {
/*		margin-bottom: initial;*/
		margin-top: initial !important;
	}

	.bottom-column li:last-child {
		margin-bottom: initial !important;
/*		margin-top: initial !important;*/
	}

	.bottom-column {
		transform: rotate(180deg);
	}

	.column-selected {

	}
</style>