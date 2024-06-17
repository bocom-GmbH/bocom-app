<template>
    <q-page padding>
        <h6>{{ userId }}</h6>
        <h6>{{ userName }}</h6>

        <div style="width:100%; display: grid; place-items: center;" class="absolute-bottom">
            <q-btn label="logout" class="bg-secondary text-white q-ma-lg" style="width: 70%;" @click="logout" />
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/authentication';
import { Cookies } from 'quasar';
import { computed } from 'vue';
import { useFileStore } from 'stores/file-store';

const router = useRouter();
const store = useUserStore();
const fileStore = useFileStore();

// Computed properties for user ID and name
const userId = computed(() => store.getUserId);
const userName = computed(() => store.getUserName);

const logout = () => {
    Cookies.remove('apollo-token');
    store.resetUserAuthentication();
    fileStore.resetFileStore();
    window.localStorage.removeItem('permissions');
    window.localStorage.removeItem('apollo-token');
    router.push('/login');
    store.$reset();
};
</script>
