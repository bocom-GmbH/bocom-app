<template>
    <div class="">
        <q-carousel
            animated
            v-model="slide"
            navigation
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled body"
            ref="carousel"
        >
        <q-carousel-slide v-for="(slide, index) in element[1].data.filter(element => element.label === 'Story')" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    :slide="slide.data"
                    :disable="!!(numberToSelect && selectedData.length >= numberToSelect) && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id"
                />
               <CardCarousel
                   :element="elementsCopy[2].data.find(element => element.label === 'Produktplatzierungen').data.slice(1).filter(element => element.data[0].storyId === currentSlideId)"
                />
            </q-carousel-slide>
            <template v-slot:control>
                <q-carousel-control
                    position="bottom-left"
                    :offset="[18,450]"
                    class="q-gutter-xs"
                >
                <q-btn
                    round dense color="white" text-color="black" icon="chevron_left"
                    @click="$refs.carousel.previous()"
                />
                </q-carousel-control>
                <q-carousel-control
                    position="bottom-right"
                    :offset="[18, 450]"
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
        CardCarousel
    },
    setup(props){

        const selectedData = inject('selectedData') as string[]
        const elementsCopy = ref<object>({})

        const currentSlideId = ref('')

        provide('currentSlideId', currentSlideId)

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        onMounted(() => {
           console.log(elementsCopy.value[2].data.find(element => element.label === 'Produktplatzierungen').data.slice(1).filter(element => element.data[0].storyId === currentSlideId.value), 'props')
        })

        return {
            slide: ref(0),
            selectedData,
            currentSlideId,
            elementsCopy
        }
    }
})
</script>

<style scoped>

.body {
    height: auto;
}

</style>
