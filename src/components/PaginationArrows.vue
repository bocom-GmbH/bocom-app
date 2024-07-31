<template>
    <div
        class="flex justify-around q-py-md items-center"
        style="width: 100%"
    >
        <q-btn
            icon="las la-step-backward"
            color="secondary"
            :disable="currentSite === 0"
            @click="currentSite = 0"
            flat
            dense
        />
        <q-btn
            icon="las la-angle-double-left"
            color="secondary"
            :disable="currentSite - 2 < 0"
            @click="currentSite - 2 > 0 ? currentSite -= 2 : null"
            flat
            dense
        />
        <q-btn
            icon="las la-angle-left"
            color="secondary"
            :disable="currentSite === 0"
            @click="currentSite > 0 ? currentSite-- : null"
            flat
            dense
        />
        <div class="label-container">
            {{ components?.label }}
        </div>
        <q-btn
            icon="las la-angle-right"
            color="secondary"
            :disable="currentSite === props.maxLength - 1"
            @click="props.maxLength > currentSite ? currentSite++ : null"
            flat
            dense
        />
        <q-btn
            icon="las la-angle-double-right"
            color="secondary"
            :disable="currentSite + 2 >= props.maxLength"
            @click="currentSite + 2 < props.maxLength ? currentSite += 2 : null"
            flat
            dense
        />
        <q-btn
            icon="las la-step-forward"
            color="secondary"
            :disable="currentSite === props.maxLength - 1"
            @click="currentSite = props.maxLength - 1"
            flat
            dense
        />
    </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, onMounted, onUnmounted } from 'vue';
import { useFileStore } from 'stores/file-store';

const currentSite = inject<Ref<number>>('currentSite');
const fileStore = useFileStore();
const components = ref<any>(fileStore.getCurrentSiteComponents());

const props = defineProps({
    maxLength: {
        type: Number,
        required: true
    }
});

watch(fileStore.getCurrentSiteComponents, () => {
    components.value = fileStore.getCurrentSiteComponents();
});
</script>

<style scoped>

</style>
