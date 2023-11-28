<template>
	<q-layout>
		<q-page-container>
			<router-view />
    	</q-page-container>
	</q-layout>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

//this is a login layout for the login page
export default defineComponent({
	name: 'LoginLayout'
})
</script>
