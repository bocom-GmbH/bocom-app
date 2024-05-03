<template>
    <q-footer bordered class="footer bg-primary text-primary q-pb-md">
        <q-tabs
            no-caps
            active-color="secondary"
            switch-indicator
            indicator-color="secondary"
            class="text-grey-8 footer-tabs"
            v-model="activeTab"
        >
            <q-route-tab
                v-for="tab in bottomMenuList"
                :key="tab.navigateToPath"
                :name="tab.name"
                :to="tab.navigateToPath"
                :icon="tab.icon"
            >
                <div class="text-black">{{ tab.label }}</div>
            </q-route-tab>
        </q-tabs>
    </q-footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTabStore } from 'src/stores/navigation-store';
import type { BottomMenuItem } from './../types/index';

const props = defineProps({
    bottomMenuList: {
        type: Array as PropType<BottomMenuItem[]>,
        required: true
    }
});

const tabStore = useTabStore();
const activeTab = ref(tabStore.getActiveTab);

watch(activeTab, (newValue) => {
    tabStore.setActiveTab(newValue);
});
</script>

<style scoped>
/* Example of a scoped style */
.footer {
    /* Styles specific to footer */
}
.text-black {
    color: black;
}
</style>
