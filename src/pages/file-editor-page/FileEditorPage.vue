<template>
    <div v-if="magazine?.projectData[0]?.TemplateIds" ref="scrollArea">
        <pagination-arrows :maxLength="magazine.projectData[0]?.TemplateIds.length" :class="['paginationButtons', { 'isScrolled': isScrolled }]"/>
        <SingleSitePage class="q-mb-xl" style="margin-top: 75px;" :siteId="magazine.projectData[0]?.TemplateIds[currentSite]"/>
      <!-- pagination deleted -->
       <!--  <PaginationButtons
            class="q-my-md q-pa-md"
            :templateIds="magazine?.projectData[0]?.TemplateIds"
        /> -->
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
import { ref, onMounted, watch, provide, onUnmounted } from 'vue';
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

const scrollArea = ref<HTMLElement | null>(null);
const isScrolled = ref(false);

provide('currentSite', currentSite);

// Watch for route changes and magazine data updates
onMounted(async () => {
    magazine.value = await fileStore.getFileDataById(magazineId.value);
    window.addEventListener('scroll', handleScroll);
});

watch(() => route.params.magazineId, (newId) => {
    if(newId !== null || newId !== undefined) {
        magazine.value = fileStore.getFileDataById(newId);
    }
});

const handleScroll = () => {
    if (scrollArea.value) {
        const { top } = scrollArea.value.getBoundingClientRect();
        isScrolled.value = top < 110;
    }
};

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
.seite-titel {
    width: 100%;
    text-align: center;
}

.paginationButtons {
    margin-top: env(safe-area-inset-top);
    position: fixed;
    top: 50px;
    width: 100%;
    z-index: 1000000000000000;
}

.isScrolled {
    background-color: rgb(255, 255, 255);
    margin-bottom: 10px;
    box-shadow: 0 2px 5px grey;
}

@keyframes changeSize{
	0% {
	}
	100%{
		height: 80px;
	}
}
</style>
