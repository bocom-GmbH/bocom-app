<template>
	<q-page>

   <router-link
        v-for="magazine in magazineList"
        :key="magazine.data?.Magazin[0]?.id"
        :to="{ path: `/FileEditorPage/${magazine.id}` }">
        <MagazinePreview
            :id="magazine.id"
        />
    </router-link>
	</q-page>
</template>

<script lang="ts">


import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';

import { Cookies } from 'quasar'
import { storeToRefs } from 'pinia';
import MagazinePreview from 'src/components/MagazinePreview.vue'

export default defineComponent({
    name: 'HomePage',
    components: {
        MagazinePreview,
    },
    setup () {

        const router = useRouter();
        const store = useUserStore();
        const fileStore = useFileStore();

        const { getFileData } = storeToRefs(fileStore)
        const magazineList = ref(getFileData)


        const logout = () => {
            Cookies.remove('apollo-token')
            store.resetUserAuthentication();
            window.localStorage.removeItem('permissions');
            router.push('/login')
            store.$reset();
        }
        return {
            logout,
            magazineList
        };
    },

});
</script>
