<template>
    <div class="q-ma-sm">
        <q-carousel
            animated
            v-model="slide"
            navigation
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled bg-primary q-pa-md q-ma-sm"
            ref="carousel"
        >
            <q-carousel-slide v-for="(slide, index) in element.slice(1)" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    :slide="slide.data"
                    :disable="!!(numberToSelect && selectedData.length >= numberToSelect) && selectedData.find(element => element === slide.data[0].id) !== slide.data[0].id"
                />
            </q-carousel-slide>
            <template v-slot:control>
                <q-carousel-control
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
                    position="bottom-right"
                    :offset="[18, 18]"
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
import { defineComponent, inject, ref } from 'vue'
import ArticleCard from './cards/ArticleCard.vue'

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
    setup() {
        const selectedData = inject('selectedData') as string[]

        return {
            slide: ref(0),
            selectedData
        };
    }
})
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
