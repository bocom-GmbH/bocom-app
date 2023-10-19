<template>
    <div class="">
        <q-carousel
            animated
            v-model="slide"
            :navigation="selectedArticle.length === 0"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled body q-mb-lg q-pb-md"
            ref="carousel"
            style="border-radius: 12px;"
            :swipeable="selectedArticle.length === 0"
        >
        <q-carousel-slide v-for="(slide, index) in element[1].data.filter(element => element.label === 'Story')" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    :slide="slide.data"
                    :disable="!!(element[1].data[0].numberToSelect && selectedData.length >= element[1].data[0].numberToSelect) && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id"
                />
               <!--  {{ articleHeight }} -->
                <div
                  v-if="selectedArticle.length > 0"
                >
                    <div>
                        <MainConfigurator
                            :numberToSelect="elementsCopy[2].data[0].numberToSelect"
                            :label="elementsCopy[2].label"
                        >
                            <template v-slot:body>
                                <div
                                    v-for="( element, index ) in elementsCopy[2].data"
                                    :key="index"
                                >
                                    <span class="label">{{ element.label }}</span>

                                    <CardCarousel
                                        v-if="element.label"
                                        :element="elementsCopy[2].data.find(products => products.label === element.label).data.slice(1).filter(products => products.data[0].storyId === currentSlideId)"
                                    />
                                </div>
                            </template>
                        </MainConfigurator>
                    </div>
                </div>
            </q-carousel-slide>
            <template v-slot:control v-if="selectedArticle.length === 0">
                <q-carousel-control
                    position="top-left"
                    :offset="[18, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                <q-btn
                    round dense color="white" text-color="black" icon="chevron_left"
                    @click="$refs.carousel.previous()"
                />
                </q-carousel-control>
                <q-carousel-control
                    position="top-right"
                    :offset="[18, articleHeight + 85]"
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
import { defineComponent, onMounted, inject, ref, onBeforeMount, provide } from 'vue';
import ArticleCard from './cards/ArticleCard.vue'
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
        MainConfigurator
    },
    setup(props){

        const selectedData = inject(selectedDataSymbol).selectedData as string[]
        const elementsCopy = ref<object>({})
        const articleHeight = ref(0)
        const currentSlideId = ref('')

        provide('currentSlideId', currentSlideId)
        provide('articleHeight', articleHeight)

        const selectedArticle = inject(selectedDataSymbol).selectedData

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        onMounted(() => {
           //console.log(elementsCopy.value[2].data.find(element => element.label === 'Promotions').data.slice(1).filter(element => element.data[0].storyId === currentSlideId.value), 'props')
        })

        return {
            slide: ref(0),
            selectedData,
            currentSlideId,
            elementsCopy,
            selectedArticle,
            articleHeight
        }
    }
})
</script>

<style scoped>

.body {
    height: auto;
}

.label {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    display: block;
    color: #000;
}

</style>
