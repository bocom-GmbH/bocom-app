<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img style="border-radius: 0px;" class="custom-img q-mt-md bg-primary" fit="scale-down" :src="`https://images.bocom.at/${element.find((element) => element.label === 'Bild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <div class="flex-column q-pa-none q-px-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element) => element.label === 'Name').value }}
            </div>
            <!-- <q-input
                :disable="!elementsCopy[0].selected"
                v-model="elementsCopy.find((element) => element.label === 'Preis').value"
                label="Preis"
                outlined
                rounded
                color="secondary"
            ></q-input> -->
            <br>
            <!-- <q-input
                :disable="!elementsCopy[0].selected"
                v-model="elementsCopy.find((element) => element.label === 'Menge').value"
                label="Menge"
                outlined
                rounded
                color="secondary"
            ></q-input> -->
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
import { ref, onBeforeMount, watch, inject } from 'vue';
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
const fileStore = useFileStore();
const { selectedData, updateElementInSelectedData, controlGroupInSelectedData, checkPermission } = inject(selectedDataSymbol) as ISelectedData;

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.element);
});

watch(props, (newVal) => {
    elementsCopy.value = cloneDeep(newVal.element);
}, { deep: true });

const setDisabled = () => {
    return selectedData.value.filter(data => data.group === true).length >= 2;
};

watch(elementsCopy, (newValue, oldValue) => {
    const { selected, id } = elementsCopy.value[0];
    const mengeElement = elementsCopy.value.find((element) => element.label === 'Menge');
    const preisElement = elementsCopy.value.find((element) => element.label === 'Preis');

    if (!selected) {
        mengeElement.value = '';
        preisElement.value = '';
        updateElementInSelectedData({ id, button: selected, Menge: '', Preis: '' });
    } else {
        const mengeValue = mengeElement.value;
        const preisValue = preisElement.value;
        updateElementInSelectedData({ id, button: selected, Menge: mengeValue, Preis: preisValue });
    }

    controlGroupInSelectedData(id, ['button', 'Menge', 'Preis']);
    fileStore.update(id, elementsCopy.value);

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
}
.custom-img {
  height: 170px;
}
.custom-text {
  font-size: large;
}
.disabled-bg {
    background-color: $primary-disabled !important;
}
</style>
