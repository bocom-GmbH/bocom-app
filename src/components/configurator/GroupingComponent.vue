<template>
    <div>
        <div class="flex justify-between items-center">
            <span class="q-ml-md q-mb-md text-weight-bold article-heading">{{ element.data[1].label }}</span>
            <CircularProgress :denominator="element.data[1].data[0].numberToSelect" :numerator="selectedData.filter(element => element.group).length" />
        </div>
        <q-carousel
            animated
            v-model="currentSlide"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="body q-mb-lg q-pb-md"
            ref="carouselRef"
            style="border-radius: 12px;"
        >
            <q-carousel-slide v-for="(slide, index) in stories" :key="index" class="q-pa-none" :name="index">
                <ArticleCard
                    class="q-mx-md"
                    style="border-radius: 12px;"
                    :slide="slide.data"
                    :disable="setDisabled(slide)"
                />
                <div>
                    <MainConfigurator :numberToSelect="elementsCopy[2].data[0].numberToSelect" :label="elementsCopy[2].label" class="q-mt-sm">
                        <template #body>
                            <div v-for="(element, index) in elementsCopy[2].data" :key="index">
                                <span class="label q-ml-md">{{ element.label }}</span>
                                <CardCarousel
                                    v-if="element.label"
                                    :element="filteredProducts(element.label)"
                                    :numberToSelect="element.data[0].numberToSelect"
                                    :disabledByParent="isDisabledByParent(element)"
                                />
                            </div>
                        </template>
                    </MainConfigurator>
                </div>
            </q-carousel-slide>
            <template v-slot:control>
                <q-carousel-control
                    v-if="currentSlide > 0"
                    position="top-left"
                    :offset="[30, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                    <q-btn round dense color="white" text-color="black" icon="chevron_left" @click="carouselRef.value.previous()" />
                </q-carousel-control>
                <q-carousel-control
                    v-if="currentSlide < stories.length - 1"
                    position="top-right"
                    :offset="[30, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                    <q-btn round dense color="white" text-color="black" icon="chevron_right" @click="carouselRef.value.next()" />
                </q-carousel-control>
            </template>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, onUnmounted, inject, provide } from 'vue';
import ArticleCard from './cards/ArticleCard.vue';
import CircularProgress from './CircularProgress.vue';
import CardCarousel from './CardCarousel.vue';
import MainConfigurator from '../MainConfigurator.vue';
import { selectedDataSymbol, ISelectedData, ISingleSelectedData } from 'src/types';
import { cloneDeep } from 'lodash';
import { useUserStore } from 'stores/authentication';
import { notify } from './../../functions/notification';

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

const userStore = useUserStore();
const data = inject(selectedDataSymbol) as ISelectedData;
console.log(data);
const selectedData = ref<ISingleSelectedData[]>(data.selectedData || null);
const elementsCopy = ref(cloneDeep(props.element.data));
const articleHeight = ref(0);
const currentSlide = ref(0);
const currentSlideId = computed(() => stories[currentSlide.value]?.data[0]?.id || '');
const carouselRef = ref(null);

const stories = computed(() => props.element.data[1].data.filter((element: any) => element.label === 'Story'));

const setDisabled = (card: any): boolean => {
    return isNumberToSelectReached() && !isCardAlreadySelected(card);
};

const isCardAlreadySelected = (card: any): boolean => {
    return !!selectedData.value.find((element: any) => element.id === card.data[0].id)?.group;
};

const isNumberToSelectReached = (): boolean => {
    const selectedElements = selectedData.value.filter((element: any) => element.group);
    return !!props.numberToSelect && selectedElements.length >= props.numberToSelect;
};

const filteredProducts = (label: string) => {
    return elementsCopy.value[2].data.find((products: any) => products.label === label)?.data.slice(1).filter((products: any) => products.data[0].storyId === currentSlideId.value);
};

const isDisabledByParent = (element: any) => {
    return selectedData.value.find((singleSelectedData: any) => singleSelectedData.group === true)?.id !== currentSlideId.value;
};

onBeforeMount(() => {
    stories.value.forEach((story: any) => {
        if (story.data[0].selected) {
            currentSlide.value = stories.value.indexOf(story);
        }
        data.updateElementInSelectedData({ id: story.data[0].id, button: story.data[0].selected });
        data.controlGroupInSelectedData(story.data[0].id, ['button']);
    });
});

onUnmounted(() => {
    selectedData.value = [];
});

provide('articleHeight', articleHeight);
provide(selectedDataSymbol, {
    selectedData,
    updateElementInSelectedData: data.updateElementInSelectedData,
    controlGroupInSelectedData: data.controlGroupInSelectedData
});

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
