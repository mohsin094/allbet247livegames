<template>
	<div id="chat-body" class="px-2">
		<ul>
			<li v-for="chat in chats" class="message-box"><p class="mb-0">{{chat}}</p></li>
		</ul>
	</div>
</template>
<script>
export default {
	props: ['chats']
}
</script>