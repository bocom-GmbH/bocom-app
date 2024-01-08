<template>
    <div class="q-ma-sm">
        <q-carousel
            animated
            v-model="currentSlide"
            :navigation="true"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled bg-primary q-pa-md q-ma-sm q-pb-xl"
            ref="carousel"
            :swipeable="true"
        >
            <!-- slicing the first element of the array, because it contains the metadata -->
            <q-carousel-slide v-for="(slide, index) in element.slice(1)" :key="index" class="q-pa-none" :name="index">
                <!-- disable the article card if the numberToSelect value reached or another article is selected as the displayed -->
                <!-- set the color of the article card to gray if the numberToSelect value reached or another article is selected as the displayed -->
                <ArticleCard
                    :slide="slide.data"
                    :disable="setDisabled(slide)"
                    :style="{ 'color':  setDisabled(slide) ? 'gray' : 'var(--q-color-primary)'}"
                />
            </q-carousel-slide>
            <!-- this tmeplate contains the buttons for controlling the carousel -->
            <template v-slot:control>
                <div>
                    <q-carousel-control
                        v-if="currentSlide > 0"
                        position="bottom-left"
                        :offset="[18, 18]"
                        class="q-gutter-xs"
                    >
                        <q-btn
                            round dense color="white" text-color="black" icon="chevron_left"
                            @click="$refs.carousel.previous()"
                        />
                    </q-carousel-control>
                    <q-carousel-control
                        v-if="currentSlide < element.length -2"
                        position="bottom-right"
                        :offset="[18, 18]"
                        class="q-gutter-xs"
                    >
                        <q-btn
                            round dense color="white" text-color="black" icon="chevron_right"
                            @click="$refs.carousel.next()"
                        />
                    </q-carousel-control>
                </div>
            </template>
        </q-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import ArticleCard from './cards/ArticleCard.vue'
import { ISelectedData, selectedDataSymbol } from 'src/types/index'

export default defineComponent({
    name: 'ArticleSelector',
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
    components: {
        ArticleCard
    },
    setup(props) {
        const data = inject(selectedDataSymbol) as ISelectedData

        const selectedData = data.selectedData
        const currentSlide = ref(0)
        const navigation = ref(true)
        //the automatic button position is not implemented here
        //set the current slide to the index of the selected element, so it will automatically slide to the selected article

        let index = 0
        for(let element of props.element) {
            console.log(element)
            if(element.data){
                data.updateElementInSelectedData({id: element.data[0].id, button: element.data[0].selected})
                if(element.data[0].selected){
                    currentSlide.value = index - 1
                }
                data.controlGroupInSelectedData(element.data[0].id, ['button'])
            }
            index++
        }


        const setDisabled = (card: object): boolean => {
            return (isNumberToSelectReached() && isCardAlreadySelected(card))
        }

        const isCardAlreadySelected = (card: object): boolean => {
            return !selectedData.value.find((element: any) => element.id === card.data[0].id)?.group
        }

        const isNumberToSelectReached = (): boolean => {
            const selectedElementsInSelectedData = selectedData.value.filter((element: any) => element.group)
            return !!props.numberToSelect && selectedElementsInSelectedData.length >= props.numberToSelect
        }

        return {
            currentSlide,
            selectedData,
            navigation,
            setDisabled
        };
    }
})
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
