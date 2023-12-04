<template>
	<q-page padding>

       <!--   <router-link
            style="text-decoration: none;"
            v-for="magazine in magazineList"
            :key="magazine.data?.Magazin[0]?.id"
            :to="{ path: `/HomePage/FileEditorPage/${magazine.id}` }"
        > -->
        <div
            style="width: 100%"
            v-for="magazine in magazineList"
            :key="magazine.data?.Magazin[0]?.id"
        >
            <MagazinePreview
                :id="magazine.id"
            />
        </div>
       <!--  </router-link> -->
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

        //if the user is logged out, redirect to the login page
        onMounted(() => {
            if(!store.isUserLoggedIn){
                router.push('/login')
            }
        })


        //displayes the megazines on the home screen
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
