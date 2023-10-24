<template>
    <div class="">
        <div class="flex justify-between items-center">
            <span class="q-ml-md q-mb-md text-weight-bold article-heading"> {{ element.data[1].label}} </span>
            <CircularProgress :denominator="element.data[1].data[0].numberToSelect" :numerator="selectedData.length"/>
        </div>
        <q-carousel
            animated
            v-model="currentSlide"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="body q-mb-lg q-pb-md"
            ref="carousel"
            style="border-radius: 12px;"
            :keep-alive="true"
        >
        <q-carousel-slide v-for="(slide, index) in element.data[1].data.filter(element => element.label === 'Story')" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    class="q-mx-md"
                    style="border-radius: 12px;"
                    :slide="slide.data"
                    :disable="!!(element.data[1].data[0].numberToSelect && selectedData.length >= element.data[1].data[0].numberToSelect) && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id"
                />
               <!--  {{ selectedData }} -->
                <!-- v-if="selectedData.length > 0" -->
                <div
                >
                    <div>
                        <MainConfigurator
                            :numberToSelect="elementsCopy[2].data[0].numberToSelect"
                            :label="elementsCopy[2].label"
                            class="q-mt-sm"
                        >
                            <template v-slot:body>
                                <div
                                    v-for="( element, index ) in elementsCopy[2].data"
                                    :key="index"
                                >
                                    <span class="label q-ml-md">{{ element.label }}</span>

                                    <CardCarousel
                                        v-if="element.label"
                                        :element="elementsCopy[2].data.find(products => products.label === element.label).data.slice(1).filter(products => products.data[0].storyId === currentSlideId)"
                                        :numberToSelect="elementsCopy[2].data[0].numberToSelect"
                                    />
                                </div>
                            </template>
                        </MainConfigurator>
                    </div>
                </div>
            </q-carousel-slide>
            <template v-slot:control v-if="selectedData.length === 0">
                <q-carousel-control
                    v-if="currentSlide > 0"
                    position="top-left"
                    :offset="[30, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                <q-btn
                    round dense color="white" text-color="black" icon="chevron_left"
                    @click="$refs.carousel.previous()"
                />
                </q-carousel-control>
                <q-carousel-control
                    v-if="currentSlide < element.data[1].data.length -2"
                    position="top-right"
                    :offset="[30, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                <q-btn
                    round dense color="white" text-color="black" icon="chevron_right"
                    @click="$refs.carousel.next()"
                />
                </q-carousel-control>
            </template>
        </q-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, ref, onBeforeMount, provide, watch } from 'vue';
import ArticleCard from './cards/ArticleCard.vue'
import CircularProgress from './CircularProgress.vue';
import { cloneDeep } from 'lodash'
import CardCarousel from './CardCarousel.vue';
import MainConfigurator from '../MainConfigurator.vue';
import { selectedDataSymbol, IselectedData } from 'src/types/index'



export default defineComponent({
    name: 'GroupingComponent',
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
        ArticleCard,
        CardCarousel,
        MainConfigurator,
        CircularProgress
    },
    setup(props){

        const selectedData = ref<IselectedData[]>([])
        const elementsCopy = ref<object>({})
        const articleHeight = ref(0)
        const currentSlideId = ref('')

        const addElementToSelectedData = (element: string) => {
            selectedData.value.push(element)
        }

        const removeElementFromSelectedData = (element: string) => {
            selectedData.value = selectedData.value.filter(item => item !== element)
        }

        provide('currentSlideId', currentSlideId)
        provide('articleHeight', articleHeight)
        provide(selectedDataSymbol, {
            selectedData,
            addElementToSelectedData,
            removeElementFromSelectedData
        })

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element.data)
        })

        return {
            currentSlide: ref(0),
            selectedData,
            currentSlideId,
            elementsCopy,
            articleHeight
        }
    }
})
</script>

<style scoped>

.body {
    height: auto;
    border-bottom-left-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
}

.label {
    font-size: 1.1rem;
    font-weight: 500;

    display: block;
    color: #000;
}

.article-heading {
  font-size: 22px;
}

</style>
