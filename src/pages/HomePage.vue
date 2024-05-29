<template>
    <q-page padding>
        <div
            style="width: 100%"
            v-for="magazine in fileStore.getFileData"
            :key="magazine.data?.Magazin[0]?.id"
        >
            <MagazinePreview :id="magazine.id" />
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';
import MagazinePreview from 'src/components/MagazinePreview.vue';

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

</script>

<style scoped>
/* Add specific styles here */
</style>
