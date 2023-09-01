<template>
    <div>
        <component
            v-for="element in componentData?.elements"
            :is="element.componentId"
            :key="element.id"
            :element="element"
        />
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import ImageSelector from './configurator/ImageSelector.vue';
import ArticleSelector from './configurator/ArticleSelector.vue';
import InputFieldsCard from './configurator/InputFieldsCard.vue';
import CardCarousel from './configurator/CardCarousel.vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true
        },
        componentData: {
            type: Object,
            required: true
        }
    },
    components: {
        ImageSelector,
        ArticleSelector,
        InputFieldsCard,
        CardCarousel
    },




})
</script>
