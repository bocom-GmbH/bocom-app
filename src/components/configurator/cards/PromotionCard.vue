<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img style="border-radius: 0px;" class="custom-img q-mt-md bg-primary" fit="scale-down" :src="`https://images.bocom.at/${element.find((element) => element.label === 'Bild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <div class="flex-column q-pa-none q-px-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element) => element.label === 'Name').value }}
            </div>
            Promotionwert: € {{ element.find((element) => element.label === 'Promotionwert').value }} <br> <br>
        </div>
        <q-toggle
            class="q-mt-none"
            color="positive"
            v-model="elementsCopy[0].selected"
            size="70px"
            :disable="disable"
        />
    </q-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, inject } from 'vue';
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store';
import { selectedDataSymbol, ISelectedData } from 'src/types/index';

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
const selected = ref(props.element[0]?.selected);
const fileStore = useFileStore();
const data = inject(selectedDataSymbol) as ISelectedData;

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.element);
});

watch(() => props.element, (newVal) => {
    elementsCopy.value = cloneDeep(newVal);
}, { deep: true });

onMounted(() => {
    selected.value = props.element[0]?.selected;
});

watch(elementsCopy, (newValue, oldValue) => {
    data.updateElementInSelectedData({
        id: props.element[0].id,
        button: elementsCopy.value[0].selected
    });
    data.controlGroupInSelectedData(props.element[0].id, ['button']);
    fileStore.update(props.element[0].id, elementsCopy.value);
}, { deep: true });
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
  max-height: 500px !important;
}
.custom-img {
  max-height: 170px;
}
.custom-text {
  font-size: large;
}
.disabled-bg {
    background-color: $primary-disabled !important;
}
</style>
