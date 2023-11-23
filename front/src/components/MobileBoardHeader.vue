<template>
	<Menubar>
    <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
            <path d="..." fill="var(--primary-color)" />
            <path d="..." fill="var(--text-color)" />
        </svg>
    </template>
    <template #item>
       ljsdflj
    </template>
    <template #end>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
            <path d="..." fill="var(--primary-color)" />
            <path d="..." fill="var(--text-color)" />
        </svg>
    </template>
</Menubar>

</template>
<script>
	import Menubar from 'primevue/menubar';
	export default{
		props:['match', 'playerBlack', 'playerWhite']
	}
</script>