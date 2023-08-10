<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title>
					Quasar App
				</q-toolbar-title>
				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>
		
    <q-page-container>
		<router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Cookies } from 'quasar';
import { useUserStore } from 'src/stores/authentication';

export default defineComponent({
	name: 'MainLayout',
	setup(){
		const store = useUserStore();
		store.setPermissions(window.localStorage.getItem('permissions')?.split(','))
			
		return {
			
		}
	}
});
</script>
