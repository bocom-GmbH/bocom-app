<template>
    <q-page padding>
        <div
            style="width: 100%"
            v-for="magazine in fileStore.getFileData"
            :key="magazine.data?.Magazin[0]?.id"
        >
            <MagazinePreview :id="magazine.id" />
        </div>

        <!-- <div v-if="!fileDetails.loading"> -->
            <div
                class="magazine-card flex no-wrap items-center q-my-md"
                v-for="(file, index) in fileDetails"
                :key="index"
            >
                <q-list style="width: 100%; border:none" bordered class="rounded-borders">
                    <q-expansion-item
                        class="q-expansion-item shadow-1 overflow-hidden"
                        style="border-radius: 8px; width: 100%;"

                        :label=" file.number + '-' + file.year + '-' + file.name"
                        header-class="bg-primary text-secondary"
                        expand-icon-class="text-secondary"
                    >
                        <q-card class="q-mr-md">
                            <q-card-section>
                                Projekt Details <br>
                                <div class="flex justify-between">
                                    <div>
                                        Projekt Nummer:
                                    </div>
                                    <div>
                                        {{ file.number }}
                                    </div>
                                </div>
                                <div  class="flex justify-between">
                                    <div>
                                        Startdatum:
                                    </div>
                                    <div>
                                        {{ file.startdate }}
                                    </div>
                                </div>
                                <div  class="flex">
                                    <div>
                                        Status:
                                    </div>
                                    <div style="width: 100%" class="q-pl-md">
                                        <div class="flex justify-between" v-for="(status, index) of file.statelist" :key="index">
                                            <div>
                                                {{ status.state }}
                                            </div>
                                            <div>
                                                {{ status.date }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                            <q-btn
                                class="q-ma-md"
                                style="width: 95%"
                                color="primary"
                                label="Open"
                                text-color="secondary"
                            />
                        </q-card>
                    </q-expansion-item>
                </q-list>
            </div>
       <!--  </div> -->
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';
import { Cookies } from 'quasar'
import MagazinePreview from 'src/components/MagazinePreview.vue';

import { useQuery } from '@vue/apollo-composable';
import { getAllProjectsToClient } from 'src/apollo/queries/files';

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

// If the user is logged out, redirect to the login page
onMounted(() => {
    fileStore.currentSiteMap = [];
    if (!userStore.isUserLoggedIn) {
        router.push('/login');
    }
});

const fileDetails = ref<IFileDetails>();

onMounted(() => {
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
        fileDetails.value = result?.data?.getAllProjectsToClient;
    });
}

onUnmounted(() => {
    fileDetails.value = undefined;
});

</script>

<style scoped>
/* Add specific styles here */
</style>
