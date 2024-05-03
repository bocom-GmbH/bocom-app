<template>
    <q-header class="bg-accent" elevated>
        <q-toolbar>
            <q-btn
                v-if="tabStore.isBackButtonAvailable"
                color="secondary"
                icon="arrow_back"
                class="back-button q-ma-sm absolute"
                @click="goBack"
                flat
                dense
            />
        </q-toolbar>
    </q-header>
</template>

<script setup lang="ts">
import { useTabStore } from 'src/stores/navigation-store';

const tabStore = useTabStore();

const goBack = () => {
    history.back();
};
</script>

<style scoped>
/* Add any specific styles for your header component here */
</style>
