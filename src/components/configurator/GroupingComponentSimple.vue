<template>
    <div
        v-for="(carousel, index) in elementsCopy[1].data"
        :key="index"
    >
        <card-carousel
            v-if="true"
            :element="carousel.data"
            :numberToSelect="2"
            :disabledByParent="/* isDisabledByParent(element) */ false"
        />
    </div>
</template>

<script setup lang="ts">
import CardCarousel from './CardCarousel.vue';
import { ref, onBeforeMount, watch, inject } from 'vue';
import { cloneDeep } from 'lodash';
import { selectedDataSymbol } from 'src/types/index';

const props = defineProps({
    element: {
        type: Object,
        required: true
    },
    numberToSelect: {
        type: Number,
        //default: 0
    },
    disabledByParent: {
        type: Boolean,
        default: false
    }
});

const { selectedData, updateElementInSelectedData, controlGroupInSelectedData, checkPermission } = inject(selectedDataSymbol);

const elementsCopy = ref(cloneDeep(props.element));

const filteredProducts = (label: string) => {
    //return elementsCopy.value[2].data.find((products: any) => products.label === label)?.data.slice(1).filter((products: any) => products.data[0].storyId === currentSlideId.value);
};

/* const isDisabledByParent = (element: any) => {
    return selectedData.value.find((singleSelectedData: any) => singleSelectedData.group === true)?.id !== currentSlideId.value;
}; */
</script>
