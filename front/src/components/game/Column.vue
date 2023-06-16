<template>
	<div @click="$emit('touch-column', {id: data.index})" :class="{'top-column': (data.index < 13), 'bottom-column': (data.index > 12)}" class="column-wrapper" v-if="data" :style="{top: (data.index < 13) ? data.y+'px' : 'initial',bottom: (data.index > 12 ) ? data.y+'px' : 'initial' , left: data.x+'px', width: globalVars.checkerSize+'px'}">
		<img :style="{width: globalVars.checkerSize+'px'}" v-show="data.focus" src="@/assets/game/img/column-selected.svg" class="column-selected" />
		<ul class="column-holder">
			<li :style="{'margin-top': (data.index < 13) ? '-50%' : 'initial','margin-bottom': (data.index > 12 ) ? '-50%' : 'initial'}" @click="$emit('touch', {index:checker.index, color:checker.color})" v-for="checker in data.container" :key="checker.index">
				<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.WHITE" src="@/assets/game/img/white-checker.png" />
				<img class="checker img-fluid" :style="{width: checker.width+'px'}" v-if="checker.color == playerColor.BLACK" src="@/assets/game/img/black-checker.png" />
				<img v-show="checker.selected" :style="{width: checker.width+'px'}" class="checker checker-selected img-fluid" src="@/assets/game/img/checker-selected.png" />
			</li>
		</ul>
	</div>
</template>
<script>
	import {PLAYER_COLOR} from "@/extensions/backgammon/Player.js";
	export default {
		props: {
			data: {
				type: Object
			},
			globalVars: {
				type: Object
			}
		},
		data() {
			return {
				playerColor: PLAYER_COLOR
			}
		}
	}
</script>
<style>
	.column-wrapper {
		position: absolute;
		min-height: 40%;
	}
	.checker-selected {
		position: absolute;
		left: 0;
	}

	.column-holder {
		position: relative;
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
		position: absolute;
		left: 0;
		right: 0;
	}
</style>