<template>
    <div class="q-pa-xs">
        <span class="text-weight-bold product-title">Produkte auswahlen</span>
        <div class="wrapper q-pl-sm">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductCard from 'src/components/configurator/ProductCard.vue'
export default defineComponent({
    name: 'ProductSelector',
    components: {
        ProductCard
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
