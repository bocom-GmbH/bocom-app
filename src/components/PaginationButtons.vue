<template>
    <div ref="wrapper" class="wrapper q-px-md">
        <q-btn
            v-for="(page, index) in orderedSiteMap"
            :key="index"
            :label="page.label"
            color="primary"
            class="pagination-btn"
            :text-color="index === currentPageIndex ? 'secondary' : 'secondary'"
            :flat="!(index === currentPageIndex)"
            @click="goToPage(index)"
            :disable="index === currentPageIndex"
            :ref="index === currentPageIndex ? 'activeButton' : null"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, nextTick } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { getSiteById } from 'src/apollo/queries/files';
import { useFileStore } from 'stores/file-store';

const props = defineProps({
    templateIds: {
        type: Array,
        required: true
    }
});

const wrapper = ref(null);
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

    nextTick(() => {
        centerActiveButton();
    });
});

watch(currentPageIndex, () => {
    nextTick(() => {
        centerActiveButton();
    });
});

const goToPage = (index) => {
    currentPage.value = orderedSiteMap.value[index].index;
};

const centerActiveButton = () => {
    if (wrapper.value && wrapper.value.$el) {
        const activeButton = wrapper.value.$el.querySelector('.q-btn.q-btn--flat');
        if (activeButton) {
            const wrapperRect = wrapper.value.$el.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            const offset = buttonRect.left - wrapperRect.left - (wrapperRect.width / 2) + (buttonRect.width / 2);
            wrapper.value.$el.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: auto;
    scroll-behavior: smooth;
    white-space: nowrap; /* Prevent wrapping */
}

.pagination-btn {
    min-width: 20px;
    flex-shrink: 0; /* Prevent buttons from shrinking */
    margin: 0 5px; /* Adjust the margin as needed */
}
</style>
