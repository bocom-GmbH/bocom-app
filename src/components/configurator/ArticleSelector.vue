<template>
    <div class="q-ma-sm">
        hi
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
        {{ element }}
            <q-carousel-slide v-for="(slide, index) in element.slice(1)" :key="index" class="q-pa-none" :name="index">
                {{ slide.data}}
                <ArticleCard
                    :slide="slide.data"
                    :disable="setDisabled(slide)"
                    :style="{ 'color': setDisabled(slide) ? 'gray' : 'var(--q-color-primary)'}"
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
                            @click="previousSlide"
                        />
                    </q-carousel-control>
                    <q-carousel-control
                        v-if="currentSlide < element.length - 2"
                        position="bottom-right"
                        :offset="[18, 18]"
                        class="q-gutter-xs"
                    >
                        <q-btn
                            round dense color="white" text-color="black" icon="chevron_right"
                            @click="nextSlide"
                        />
                    </q-carousel-control>
                </div>
            </template>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import ArticleCard from './cards/ArticleCard.vue';
import { ISelectedData, selectedDataSymbol } from 'src/types/index';

const props = defineProps({
    element: {
        type: Object,
        required: true
    },
    numberToSelect: {
        type: Number,
        default: 0
    }
});

const carousel = ref(null);
const currentSlide = ref(0);
const data = inject(selectedDataSymbol) as ISelectedData;
const selectedData = data.selectedData;

onMounted(() => {
    let index = 0;
    for (let element of props.element.slice(1)) {
        if (element.data) {
            data.updateElementInSelectedData({id: element.data[0].id, button: element.data[0].selected});
            if (element.data[0].selected) {
                currentSlide.value = index;
            }
            data.controlGroupInSelectedData(element.data[0].id, ['button']);
        }
        index++;
    }
});

const setDisabled = (card: any): boolean => {
    return isNumberToSelectReached() && !isCardAlreadySelected(card);
};

const isCardAlreadySelected = (card: any): boolean => {
    return !!selectedData.value.find((item: any) => item.id === card.data[0].id)?.group;
};

const isNumberToSelectReached = (): boolean => {
    const selectedCount = selectedData.value.filter((item: any) => item.group).length;
    return props.numberToSelect && selectedCount >= props.numberToSelect;
};

const previousSlide = () => {
    if (carousel.value) {
        carousel.value.previous();
    }
};

const nextSlide = () => {
    if (carousel.value) {
        carousel.value.next();
    }
};
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
