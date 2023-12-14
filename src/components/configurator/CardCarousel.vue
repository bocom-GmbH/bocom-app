<template>
    <div class="">
        <!-- this is the wrapper for the carousel -->
        <div class="wrapper q-px-md" v-if="element">
            <div
                v-for="card in element.filter(element => element.label)"
                :key="card.data.elementId"
            >
                <component
                    :is="getComponentById(card.data[0].elementId)"
                    :element="card.data"
                    :numberToSelect="numberToSelect"
                    :disable="setDisabled(card)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue'
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
        //the whole carousel can be disabled by the parent
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

        // the function clears the selectedData array
        const resetSelectedData = () => {
           selectedData.value = []
        }

        const setDisabled = (card: object): boolean => {
            return (isNumberToSelectReached() && !isCardAlreadySelected(card)) || props.disabledByParent
        }

        const isCardAlreadySelected = (card: object): boolean => {
            return !!selectedData.value.find((element: any) => element.id === card.data[0].id)?.button
        }

        const isNumberToSelectReached = (): boolean => {
            const selectedElementsInSelectedData = selectedData.value.filter((element: any) => element.button)
            return !!props.numberToSelect && selectedElementsInSelectedData.length >= props.numberToSelect
        }

        // if the resetCardCarousel is triggered, reset the selectedData and call the resetSelectedData store function witch resets the selected values in the template
        watch((resetCardCarousel), () => {
            if(resetCardCarousel.value < 1){
                resetSelectedData
                for(let element of props.element) {
                    fileStore.resetSelectedValues(element.path)
                }
            }
        })

        //using the component hub to get the component by id
        //at this time the MitarbeiterCard, PorductCard or the PromotionCard
        const getComponentById = (id: string) => {
            return componentHub.getComponentById(id)
        }

        return {
            selectedData,
            getComponentById,
            setDisabled,
            isNumberToSelectReached,
            isCardAlreadySelected
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
