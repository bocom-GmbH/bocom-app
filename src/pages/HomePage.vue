<template>
	<q-page>

         <router-link
            style="text-decoration: none;"
            v-for="magazine in magazineList"
            :key="magazine.data?.Magazin[0]?.id"
            :to="{ path: `/HomePage/FileEditorPage/${magazine.id}` }">
            <MagazinePreview
                :id="magazine.id"
            />
        </router-link>

    </q-page>
</template>

<script lang="ts">


import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';

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

        onMounted(() => {
            if(!store.isUserLoggedIn){
                router.push('/login')
            }
        })

        const { getFileData } = storeToRefs(fileStore)
        const magazineList = ref(getFileData)

        return {
            magazineList
        }
    },

});
</script>
<style scoped>

</style>
