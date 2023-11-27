<template>
    <div v-if="magazine?.TemplateIds" ref="scrollArea">
       <SingleSitePage
            :siteId="magazine.TemplateIds[currentSite - 1]"
       />
        <div class="pagination">
            <q-pagination
                class="q-ma-none"
                v-model="currentSite"
                :max="magazine.TemplateIds.length"
                direction-links
            />
        </div>
    </div>
    <div v-else class="q-pa-md flex flex-center">
        <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, inject } from 'vue';
import { useFileStore } from 'stores/file-store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import SingleSitePage from './SingleSitePage.vue';

export default defineComponent({
    name: 'FileEditorPage',
    props: {
        magazineId: {
            type: String,
            required: true
        }
    },
    components: {
        SingleSitePage
    },
    setup() {
        const route = useRoute();
        const fileStore = useFileStore();
        const magazine = ref();
        const sites = ref<string[]>(['']);
        const { getFileData } = storeToRefs(fileStore);

        const currentSite = ref(1);

        onMounted(() => {
            magazine.value = fileStore.getFileDataById(route.params.magazineId);
        });

        watch(getFileData, () => {
            magazine.value = fileStore.getFileDataById(route.params.magazineId);
        });

        return {
            magazine,
            sites,
            currentSite
        };
    }
})


</script>

<style>
.seite-titel{
    width: 100%;
    text-align: center;
}
.pagination {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
</style>
