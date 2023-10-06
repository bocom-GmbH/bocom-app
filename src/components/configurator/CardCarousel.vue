<template>
    <div class="q-pa-sm">
        <div class="wrapper q-pl-sm" v-if="element">
            <div
                v-for="card in element.slice(1)"
                :key="card.data.elementId"
            >

            <component
                :is="componentHub.getComponentById(card.data[0].elementId)"
                :element="card.data"
            />
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useComponentStore } from 'stores/component-hub-store'

export default defineComponent({
    name: 'CardCarousel',

    props:{
        element: {
            type: Object,
            required: true
        }
    },
    setup() {
        const componentHub = useComponentStore()
        return {
            componentHub
        }
    }
})
</script>

<style scoped>


/* Import is not working here */
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
