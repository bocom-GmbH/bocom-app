<template>
	<q-layout view="lHh Lpr lFf">

		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title class="text-accent text-bold">
					Bocom-app
				</q-toolbar-title>
        <q-btn
          flat
          round
          icon="menu"
          class="text-accent"
          @click="$q.drawer('left').toggle()"
        />
			</q-toolbar>
		</q-header>

	<q-page-container>
		<router-view />
	</q-page-container>

	<BottomMenu
		:bottomMenuList="bottomMenu"
	/>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Cookies } from 'quasar';
import { useUserStore } from 'src/stores/authentication';
import BottomMenu from 'src/components/BottomMenu.vue';

export default defineComponent({
	name: 'MainLayout',
    components: {
        BottomMenu
    },
	setup(){
		const store = useUserStore();
		const drawer = ref(false)
		store.setPermissions(window.localStorage.getItem('permissions')?.split(','))
		const bottomMenu = computed(() => [
			{
				label: 'Home',
				icon: 'Home_light',
				notification: 0,
				navigateToPath: '/',
			},
			{
				label: 'Aktivitat',
				icon: 'Bell',
				notification: 0,
				navigateToPath: '/ActivityPage',
			},
		]);

		return {
			bottomMenu,
			drawer
		}
	}
});
</script>
