<template>
    <div class="">
        <div class="wrapper q-pl-sm" v-if="element">
            <div
                v-for="card in element.filter(element => element.label)"
                :key="card.data.elementId"
            >
                <component
                    :is="getComponentById(card.data[0].elementId)"
                    :element="card.data"
                    :numberToSelect="numberToSelect"
                    :disable="!!(numberToSelect && selectedData.length >= numberToSelect) && selectedData.find(element => element === card.data[0].id) !== card.data[0].id"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { useComponentStore } from 'stores/component-hub-store'
import { selectedDataSymbol } from 'src/types/index'

export default defineComponent({
    name: 'CardCarousel',
    props: {
        element: {
            type: Object,
            required: true
        },
        numberToSelect: {
            type: Number,
            required: false
        }
    },
    setup(props){
        const componentHub = useComponentStore()
        const data = inject(selectedDataSymbol) as object
        const selectedData = data.selectedData

        const getComponentById = (id: string) => {
            return componentHub.getComponentById(id)
        }

        onMounted(() => {
            //console.log(props.element, 'element')
        })

        return {
            selectedData,
            getComponentById
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
