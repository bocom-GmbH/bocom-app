<template>
    <div class="">
        <div class="wrapper q-px-md" v-if="element">
            <div
                v-for="card in element.filter(element => element.label)"
                :key="card.data.elementId"
            >
                <component
                    :is="getComponentById(card.data[0].elementId)"
                    :element="card.data"
                    :numberToSelect="numberToSelect"
                    :disable="(!!(numberToSelect && selectedData.length >= numberToSelect) && selectedData.find(element => element === card.data[0].id) !== card.data[0].id) || disabledByParent"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import { useComponentStore } from 'stores/component-hub-store'
import { selectedDataSymbol } from 'src/types/index'
import { useFileStore } from 'stores/file-store'

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
        },
        disabledByParent: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    setup(props){
        const fileStore = useFileStore()
        const componentHub = useComponentStore()
        const data = inject(selectedDataSymbol) as object
        const selectedData = ref(data.selectedData)
        const resetCardCarousel = ref(inject('resetCardCarousel'))

        const resetSelectedData = () => {
           selectedData.value = []
        }

        // if the resetCardCarousel is triggered, reset the selectedData and call the resetSelectedData store function
        watch((resetCardCarousel), () => {
            resetSelectedData
            for(let element of props.element) {
                fileStore.resetSelectedValues(element.path)
            }
        })

        const getComponentById = (id: string) => {
            return componentHub.getComponentById(id)
        }

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
