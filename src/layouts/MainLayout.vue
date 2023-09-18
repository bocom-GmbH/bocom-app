<template>
	<q-layout view="lHh Lpr lFf">

		<q-header class="bg-accent" elevated>
			<q-toolbar>
                <q-btn
                    color="secondary"
                    icon="arrow_back"
                    class="back-button q-ma-sm absolute"
                    @click="goBack"
                    unelevated
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
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/authentication';
import BottomMenu from 'src/components/BottomMenu.vue';


import { useFileStore } from 'stores/file-store';
import { useQuery } from '@vue/apollo-composable'
import { getMagazine } from '../apollo/queries/files'

export default defineComponent({
	name: 'MainLayout',
    components: {
        BottomMenu
    },
    setup(){
        const store = useUserStore();
        const drawer = ref(false)
        if(window.localStorage.getItem('permissions')){
            store.setPermissions(window.localStorage.getItem('permissions')?.split(','))
        }
        const fileStore = useFileStore();
        const magazine = ref({})

        const goBack = () => {
			history.back();
		};
        const queryFileData = () => {
            try {
                const { onResult } = useQuery(
                    getMagazine, () => ({

                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {
                    magazine.value = result
                    fileStore.setFileData(result.data?.Magazin)
                })
            } catch ( error) {
                console.log(error)
            }
        }

        onMounted( () => {
            queryFileData()
        })


        const bottomMenu = computed(() => [
            {
                label: 'Startseite',
                icon: 'las la-home',
                notification: 0,
                navigateToPath: '/',
            },
            {
                label: 'Benutzer',
                icon: 'lar la-user',
                notification: 0,
                navigateToPath: '/UserPage',
            },
        ]);

        return {
            bottomMenu,
            drawer,
            goBack,
        }
    }
});
</script>
