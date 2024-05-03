<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img class="custom-img" :src="`https://images.bocom.at/${element.find((element) => element.label === 'Bild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <div class="flex-column q-pa-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element) => element.label === 'Titel').value }}
                {{ element.find((element) => element.label === 'Name').value }}
            </div>
            {{ element.find((element) => element.label === 'Position').value }}
        </div>
        <q-toggle
            class="q-mt-xs"
            color="positive"
            v-model="elementsCopy[0].selected"
            size="70px"
            :disable="disable || !checkPermission(elementsCopy[0]?.permissionId, false)"
            @click="checkPermission(elementsCopy[0]?.permissionId, true)"
        />
    </q-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, inject } from 'vue';
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store';
import { selectedDataSymbol, IselectedData } from 'src/types/index';

const props = defineProps({
    element: {
        type: Object,
        required: true
    },
    disable: {
        type: Boolean,
        default: false
    }
});

const elementsCopy = ref(cloneDeep(props.element));
const selected = ref(props.element[0].selected); // Assuming 'selected' is a part of your element object structure
const fileStore = useFileStore();
const data = inject(selectedDataSymbol) as IselectedData;

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.element);
});

onMounted(() => {
    selected.value = props.element[0].selected;
});

watch(elementsCopy, () => {
    fileStore.update(props.element[0].id, elementsCopy.value);
    data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected});
    data.controlGroupInSelectedData(props.element[0].id, ['button']);
}, { deep: true });

const checkPermission = (id: string, emitEvent: boolean) => {
    return data.checkPermission(id, emitEvent);
};
</script>

<style lang="scss" scoped>
.no-wrap {
  width: 100%;
}
.row.inline, .column.inline, .flex.inline {
  display: inline-flex;
  justify-content: center;
}
.custom-card {
  border-radius: 12px;
  min-width: 200px !important;
  min-height: 350px;
}
.custom-img {
  height: 170px;
}
.custom-text {
  font-size: large;
  -webkit-hyphens: auto;
  hyphens: auto;
}
.disabled-bg {
    background-color: $primary-disabled !important;
}
</style>
