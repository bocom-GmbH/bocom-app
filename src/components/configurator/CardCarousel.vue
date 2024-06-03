<template>
    <div>
        <div class="wrapper q-px-md" v-if="element">
            <div v-for="(card, index) in element.filter(element => element.label)" :key="card.data.elementId">
                <component
                    :is="getComponentById(card.data[0].elementId)"
                    :element="card.data"
                    :numberToSelect="numberToSelect"
                    :disable="setDisabled(card)"
                    :key="index"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue';
import { useComponentStore } from 'stores/component-hub-store';
import { selectedDataSymbol } from 'src/types/index';
import { useFileStore } from 'stores/file-store';

const props = defineProps({
    element: {
        type: Object,
        required: true
    },
    numberToSelect: {
        type: Number,
        default: 0
    },
    disabledByParent: {
        type: Boolean,
        default: false
    }
});

const fileStore = useFileStore();
const componentHub = useComponentStore();
const data = inject(selectedDataSymbol) as any;
const selectedData = ref(data.selectedData);
const resetCardCarousel = ref(inject('resetCardCarousel') as any);

const resetSelectedData = () => {
    selectedData.value = [];
};

const setDisabled = (card: any): boolean => {
    return (isNumberToSelectReached() && !isCardAlreadySelected(card)) || props.disabledByParent;
};

const isCardAlreadySelected = (card: any): boolean => {
    return !!selectedData.value.find((element: any) => element.id === card.data[0].id)?.button;
};

const isNumberToSelectReached = (): boolean => {
    const selectedElements = selectedData.value.filter((element: any) => element.button);
    return !!props.numberToSelect && selectedElements.length >= props.numberToSelect;
};

watch(resetCardCarousel, () => {
    if (resetCardCarousel.value < 1) {
        resetSelectedData();
        props.element.forEach((element: any) => {
            fileStore.resetSelectedValues(element.path);
        });
    }
}, { immediate: true });

const getComponentById = (id: string) => {
    return componentHub.getComponentById(id);
};
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';

.wrapper {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: auto;
    scroll-behavior: smooth;
}

.product-title {
    font-size: 22px;
}
</style>
