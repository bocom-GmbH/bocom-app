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
            <q-carousel-slide v-for="(slide, index) in element.slice(1)" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    :slide="slide.data"
                    :disable="!!(numberToSelect && selectedData.length >= numberToSelect) && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id"
                    :style="{ 'color':  !!(numberToSelect && selectedData.length >= numberToSelect) && slide && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id ? 'gray' : 'var(--q-color-primary)'}"
                />
            </q-carousel-slide>
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
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import ArticleCard from './cards/ArticleCard.vue'
import { IselectedData, selectedDataSymbol } from 'src/types/index'


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
        const data = inject(selectedDataSymbol) as IselectedData

        const selectedData = data.selectedData
        const firstSelectedId = ref('')
        const currentSlide = ref(0)
        const navigation = ref(true)

        onMounted(() =>{

            let index = 0

            for(let element of props.element) {
                if(element.data){
                    if(element?.data[0].selected){
                        if(firstSelectedId.value === ''){
                            firstSelectedId.value = element?.data[0].id
                            currentSlide.value = index - 1
                        }
                        data.addElementToSelectedData(element?.data[0].id)
                    } else {
                        data.removeElementFromSelectedData(element?.data[0].id)
                    }
                }
                index++
            }
        })

        return {
            firstSelectedId,
            currentSlide,
            selectedData,
            navigation
        };
    }
})
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
