<template>
    <q-layout view="lHh Lpr lFf">
        <AppHeader />

        <q-page-container>
            <keep-alive>
                <router-view />
            </keep-alive>
        </q-page-container>

        <BottomMenu :bottomMenuList="bottomMenuList" />
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from 'vue';
import { useUserStore } from 'src/stores/authentication';
import { useFileStore } from 'stores/file-store';

import BottomMenu from 'src/components/BottomMenu.vue';
import { bottomMenuList } from 'src/BottomMenuConfig';

import { useQuery } from '@vue/apollo-composable';
import { getMagazine } from '../apollo/queries/files';
import AppHeader from 'src/components/AppHeader.vue';

export default defineComponent({
    name: 'MainLayout',
    components: {
        BottomMenu,
        AppHeader,
    },
    setup() {
        const store = useUserStore();
        const drawer = ref(false);
        //on starting the application. If the permissions are stored in local storage, load them into store
        if (window.localStorage.getItem('permissions')) {
            store.setPermissions(
                window.localStorage.getItem('permissions')?.split(',')
            );
        }
        //on starting the application. If the permissions are stored in local storage, load them into store
        if (window.localStorage.getItem('apollo-token')) {
            store.setUserData(window.localStorage.getItem('apollo-token'));
        }
        const fileStore = useFileStore();
        const magazine = ref({});

        const queryFileData = () => {
            try {
                const { onResult } = useQuery(
                    getMagazine,
                    () => ({}),
                    () => ({
                        errorPolicy: 'all',
                        fetchPolicy: 'no-cache',
                    })
                );
                onResult((result) => {
                    magazine.value = result;
                    fileStore.setFileData(result.data?.Magazin);
                });
            } catch (error) {
                console.log(error);
            }
        };

        //get the magazines from the server on starting the application
        onMounted(() => {
            queryFileData();
        });

        return {
            bottomMenuList,
            drawer,
        };
    },
});
</script>
