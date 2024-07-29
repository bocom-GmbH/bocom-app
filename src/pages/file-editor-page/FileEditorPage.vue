<template>
    <div v-if="magazine?.projectData[0]?.TemplateIds" ref="scrollArea">
        <pagination-arrows :maxLength="magazine.projectData[0]?.TemplateIds.length"/>
        <SingleSitePage :siteId="magazine.projectData[0]?.TemplateIds[currentSite]" />
       <!--  <div class="pagination">
            <q-pagination
                class="q-ma-none"
                v-model="currentSite"
                :max="magazine.TemplateIds.length"
                direction-links
            />
        </div> -->
        <PaginationButtons
            class="q-my-md q-pa-md"
            :templateIds="magazine?.projectData[0]?.TemplateIds"
        />
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

<script setup lang="ts">
import { ref, onMounted, watch, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useFileStore } from 'stores/file-store';
import SingleSitePage from './SingleSitePage.vue';
import PaginationButtons from 'components/PaginationButtons.vue';
import PaginationArrows from 'components/PaginationArrows.vue';

const route = useRoute();
const fileStore = useFileStore();

const magazineId = ref(route.params.magazineId);
const magazine = ref(null);
const currentSite = ref(0);

provide('currentSite', currentSite);

// Watch for route changes and magazine data updates
onMounted(async () => {
    magazine.value = await fileStore.getFileDataById(magazineId.value);
});

watch(() => route.params.magazineId, (newId) => {
    if(newId !== null || newId !== undefined) {
        magazine.value = fileStore.getFileDataById(newId);
    }
});

</script>

<style scoped>
.seite-titel {
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
