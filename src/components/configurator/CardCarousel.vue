<template>
    <div class="q-pa-sm">
        <span class="text-weight-bold product-title">{{ element.label }}</span>
        <div class="wrapper q-pl-sm">
            <component
                v-for="file in element.fileIds"
                :is="element.label === 'Mitarbeiter' ? 'Mitarbeiter' : 'ProductCard'"
                :key="file.elementId"
                :id="file"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductCard from 'src/components/configurator/ProductCard.vue'
import Mitarbeiter from 'src/components/configurator/MitarbeiterCard.vue'
export default defineComponent({
    name: 'CardCarousel',
    components: {
        ProductCard,
        Mitarbeiter
    },
    props:{
        element: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {

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
