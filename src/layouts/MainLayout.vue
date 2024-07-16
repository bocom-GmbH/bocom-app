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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/authentication';
import { useFileStore } from 'stores/file-store';
import { useQuery } from '@vue/apollo-composable';
import { getMagazine } from '../apollo/queries/files';
import BottomMenu from 'src/components/BottomMenu.vue';
import AppHeader from 'src/components/AppHeader.vue';
import { bottomMenuList } from 'src/BottomMenuConfig';

const userStore = useUserStore();
const fileStore = useFileStore();

// Initializing states
const magazine = ref({});
const drawer = ref(false);

// Handling local storage data for permissions
if (window.localStorage.getItem('permissions')) {
    userStore.setPermissions(
        window.localStorage.getItem('permissions')?.split(',')
    );
}

// Handling local storage data for Apollo token
if (window.localStorage.getItem('apollo-token')) {
    userStore.setUserData(window.localStorage.getItem('apollo-token'));
}

// Define a function to query magazine data
const queryFileData = () => {
    try {
        const { onResult } = useQuery(
            getMagazine,
            () => ({}),
            { errorPolicy: 'all', fetchPolicy: 'no-cache' }
        );
        onResult((result) => {
            magazine.value = result;
            fileStore.setFileData(result.data?.Magazin);
        });
    } catch (error) {
        console.error(error);
    }
};

// Fetch magazine data on component mount
onMounted(() => {
    //queryFileData();
});
</script>
