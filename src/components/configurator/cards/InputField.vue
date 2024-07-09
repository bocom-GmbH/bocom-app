<template>
    <div>
        <div>
            <q-input
                v-for="(input, index) in elementsCopy.filter((element) => element.label)"
                :key="index"
                class="q-mb-sm"
                rounded
                outlined
                :label="input.label"
                v-model="input.value"
                color="secondary"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, inject } from 'vue';
import { cloneDeep, debounce } from 'lodash';
import { useFileStore } from 'stores/file-store';
import { selectedDataSymbol, ISelectedData } from 'src/types/index';

const props = defineProps({
    element: {
        type: Object,
        required: true
    }
});

const elementsCopy = ref(cloneDeep(props.element));
const fileStore = useFileStore();
const data = inject(selectedDataSymbol) as ISelectedData;

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.element);
});

const debouncedUpdate = debounce((id: string) => {
    fileStore.update(id, elementsCopy.value);
}, 300);

const getSelectedDataObject = () => {
    let dataObject = {
        id: elementsCopy.value[0].id
    };
    elementsCopy.value.filter((element) => element.label).forEach((element) => {
        if (!dataObject[element.label]) {
            dataObject[element.label] = element.value;
        }
    });
    return dataObject;
};

watch(elementsCopy, () => {
    data.updateElementInSelectedData(getSelectedDataObject());
    data.controlGroupInSelectedData(props.element[0].id, Object.keys(getSelectedDataObject()).filter(key => key !== 'id'));
    debouncedUpdate(elementsCopy.value[0].id);
}, { deep: true });
</script>

<style scoped>
</style>
