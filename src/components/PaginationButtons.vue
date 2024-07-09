<template>
    <div class="wrapper flex justify-center q-px-md">
        <q-btn
            v-for="(page, index) in orderedSiteMap"
            :key="index"
            :label="page.label"
            color="primary"
            class="q-my-md"
            :text-color="index === currentPageIndex ? 'secondary' : 'secondary'"
            :flat="!(index === currentPageIndex)"
            @click="goToPage(index)"
            :disable="index === currentPageIndex"
            style="min-width: 20px;"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { getSiteById } from 'src/apollo/queries/files';
import { useFileStore } from 'stores/file-store';

const props = defineProps({
    templateIds: {
        type: Array,
        required: true
    }
});

const currentPage = inject('currentSite', ref(1));
const fileStore = useFileStore();

const orderedSiteMap = computed(() => {
    return fileStore.currentSiteMap.slice().sort((a, b) => a.index - b.index);
});

const currentPageIndex = computed(() => {
    return orderedSiteMap.value.findIndex(page => page.index === currentPage.value);
});

const querySiteData = async (siteById, index) => {
    try {
        const { onResult } = useQuery(
            getSiteById,
            () => ({
                templateId: siteById
            }),
            () => ({
                errorPolicy: 'all',
                fetchPolicy: 'no-cache'
            })
        );

        onResult((result) => {
            const { label, number } = extractLabelAndNumber(result.data.Seite.label);
            fileStore.setCurrentSiteMap(siteById, `${number}`, index);
        });
    } catch (error) {
        console.log(error);
    }
};

function extractLabelAndNumber(siteString) {
    const match = siteString.match(/(\D+)(\d+([+-]\d+)?)/);
    if (match) {
        return {
            label: match[1].trim(),
            number: match[2]
        };
    }
    return {
        label: siteString,
        number: ''
    };
}

onMounted(() => {
    for (const [index, site] of props.templateIds.entries()) {
        querySiteData(site, index);
    }
});

const goToPage = (index) => {
    currentPage.value = orderedSiteMap.value[index].index;
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: auto;
    scroll-behavior: smooth;
}
</style>
