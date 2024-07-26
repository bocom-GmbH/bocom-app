<template>
    <div>
        
        <div class="flex justify-between items-center">
            <span class="q-ml-md text-weight-bold article-heading">{{ label }}</span>
            <CircularProgress :denominator="numberToSelect" :numerator="selectedData.filter(element => element.group).length" />
        </div>
        <slot name="body"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import CircularProgress from 'src/components/configurator/CircularProgress.vue';
import type { ISingleSelectedData } from 'src/types/index';
import { notify } from './../functions/notification';
import { useUserStore } from 'stores/authentication';
import { selectedDataSymbol } from 'src/types/index';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    numberToSelect: {
        type: Number,
        default: 0 // provide a default value to ensure reactivity
    },

});

const userStore = useUserStore();
const selectedData = ref<ISingleSelectedData[]>([]);

const checkPermission = (permissionId: string, notifyOnRun: boolean) => {
    if (!userStore.doIHavePermissionFor(permissionId)) {
        if (notifyOnRun) {
            notify('Keine Berechtigung');
        }
        return false;
    }
    return true;
};

const updateElementInSelectedData = (element: ISingleSelectedData) => {
    const foundIndex = selectedData.value.findIndex(singleSelectedData => singleSelectedData.id === element.id);
    if (foundIndex !== -1) {
        selectedData.value.splice(foundIndex, 1, element);
    } else {
        selectedData.value.push(element);
    }
};

const controlGroupInSelectedData = (singleSelectedDataId: string, props: string[]) => {
    const singleSelectedData = selectedData.value.find(element => element.id === singleSelectedDataId);
    if (singleSelectedData) {
        singleSelectedData.group = !props.some(prop => singleSelectedData[prop] === false || singleSelectedData[prop] == '');
    }
};

const removeElementFromSelectedData = (id: string) => {
    selectedData.value = selectedData.value.filter(singleSelectedData => singleSelectedData.id !== id);
};

provide(selectedDataSymbol, {
    selectedData,
    updateElementInSelectedData,
    removeElementFromSelectedData,
    checkPermission,
    controlGroupInSelectedData
});
</script>

<style scoped>
.article-heading {
    font-size: 22px;
}
</style>
