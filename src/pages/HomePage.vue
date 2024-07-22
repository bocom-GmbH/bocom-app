<template>
    <q-page padding>
       <!--  <div
            style="width: 100%"
            v-for="magazine in fileStore.getFileData"
            :key="magazine.data?.Magazin[0]?.id"
        >
            <MagazinePreview :id="magazine.id" />
        </div> -->

        <!-- <div v-if="!fileDetails.loading"> -->
            <div
                class="magazine-card flex no-wrap items-center q-my-md"
                v-for="(file, index) in fileStore.getFileData"
                :key="index"
            >
                <magazine-preview2 v-if="file" :file="file" />
            </div>
       <!--  </div> -->
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';
import { useComponentStore } from 'stores/component-hub-store'
import { Cookies } from 'quasar'
//import MagazinePreview from 'src/components/MagazinePreview.vue';
import MagazinePreview2 from 'src/components/MagazinePreview2.vue';


import { useQuery } from '@vue/apollo-composable';
import { getAllProjectsToClient } from 'src/apollo/queries/files';
import { on } from 'events';

interface State {
    state: string;
    date: string;
}

interface IFileDetail {
    name: string;
    number: string;
    startdate: string;
    statelist: State[];
    year: number;
}

type IFileDetails = Array<IFileDetail>

const router = useRouter();
const userStore = useUserStore();
const fileStore = useFileStore();
const componentHubStore = useComponentStore();

// If the user is logged out, redirect to the login page
onMounted(() => {
    componentHubStore.getComponentHub()
    fileStore.currentSiteMap = [];
    if (!userStore.isUserLoggedIn) {
        router.push('/login');
    }
    getProjectList();
});

const getProjectList = () => {

    const { onResult } = useQuery(
        getAllProjectsToClient,
        () => ({
            errorPolicy: 'all',
            fetchPolicy: 'no-cache'
        })
    );

    onResult((result) => {
        fileStore.setFileData(result?.data?.getAllProjectsToClient);
    });
}

</script>

<style scoped>
/* Add specific styles here */
</style>
