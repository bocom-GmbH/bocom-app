<template>
    <div>
        <div class="flex justify-between items-center">
            <span class="q-ml-md q-mb-md text-weight-bold article-heading">{{ element.data[1].label }}</span>
            {{ currentSlide }} {{  stories.length }}
            <CircularProgress :denominator="element.data[1].data[0].numberToSelect" :numerator="selectedData.filter(element => element.group).length" />
        </div>
        <q-carousel
            animated
            v-model="currentSlide"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="body q-mb-lg q-pb-md"
            ref="carousel"
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
                    <MainConfigurator v-if="elementsCopy[2]" :numberToSelect="elementsCopy[2].data[0].numberToSelect" :label="elementsCopy[2].label" class="q-mt-sm">
                        <template #body>
                            <div v-for="(element, index) in elementsCopy[2].data" :key="index">
                                <span class="label q-ml-md">{{ element.label }} </span>
                                <CardCarousel
                                    v-if="element.label"
                                    :element="filteredProducts(element.label)"
                                    :numberToSelect="elementsCopy[2].data[0].numberToSelect"
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
                    <q-btn round dense color="white" text-color="black" icon="chevron_left" @click="previousSlide" />
                </q-carousel-control>
                <q-carousel-control
                    v-if="currentSlide < stories.length - 1"
                    position="top-right"
                    :offset="[30, articleHeight + 85]"
                    class="q-gutter-xs"
                >
                    <q-btn round dense color="white" text-color="black" icon="chevron_right" @click="nextSlide" />
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
const data = props.element as ISelectedData;
const selectedData = ref<ISingleSelectedData[]>([]);
const elementsCopy = ref(cloneDeep(props.element.data));
const articleHeight = ref(0);
const currentSlide = ref(0);
const currentSlideId = computed(() => stories.value[currentSlide.value]?.data[0]?.id || 'error');
const carousel = ref(null);

const resetCardCarousel = computed(() => {
    return selectedData.value.filter(element => element.group).length
})

provide('resetCardCarousel', resetCardCarousel)

const stories = computed(() => props.element.data[1].data.filter((element: any) => element.label === 'Story'));

const setDisabled = (card: any): boolean => {
    return isNumberToSelectReached() && !isCardAlreadySelected(card);
};

const isCardAlreadySelected = (card: any): boolean => {
    return !!selectedData.value.find((element: any) => element.id === card.data[0].id)?.group;
};

const isNumberToSelectReached = (): boolean => {
    const selectedElementsInSelectedData = selectedData.value.filter((element: any) => element.group)
    return !!props.element.data[1].data[0].numberToSelect && selectedElementsInSelectedData.length >= props.element.data[1].data[0].numberToSelect
};

const filteredProducts = (label: string) => {
    return elementsCopy.value[2].data.find((products: any) => products.label === label)?.data.slice(1).filter((products: any) => products.data[0].storyId === currentSlideId.value);
};

const isDisabledByParent = (element: any) => {
    return selectedData.value.find((singleSelectedData: any) => singleSelectedData.group === true)?.id !== currentSlideId.value;
};

const updateElementInSelectedData = (element: ISingleSelectedData) => {
    const foundIndex = selectedData.value.findIndex(singleSelectedData => singleSelectedData.id === element.id);
    if (foundIndex !== -1) {
        selectedData.value.splice(foundIndex, 1, element);
    } else {
        selectedData.value.push(element);
    }
};

const controlGroupInSelectedData = (singleSelectedDataId: string, props: string[]) => {
    const singleSelectedData = selectedData.value.find(element => element.id === singleSelectedDataId);
    if (singleSelectedData) {
        singleSelectedData.group = !props.some(prop => singleSelectedData[prop] === false || singleSelectedData[prop] == '');
    }
};

onBeforeMount(() => {
    stories.value.forEach((story: any) => {
        if (story.data[0].selected) {
            currentSlide.value = stories.value.indexOf(story);
        }
        updateElementInSelectedData({ id: story.data[0].id, button: story.data[0].selected });
        controlGroupInSelectedData(story.data[0].id, ['button']);
    });
});

const checkPermission = (permissionId: string, notifyOnRun: boolean) => {
    if (!userStore.doIHavePermissionFor(permissionId)) {
        if (notifyOnRun) {
            notify('Keine Berechtigung');
        }
        return false;
    }
    return true;
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

onUnmounted(() => {
    selectedData.value = [];
});

provide('articleHeight', articleHeight);
provide(selectedDataSymbol, {
    selectedData,
    updateElementInSelectedData,
    controlGroupInSelectedData,
    checkPermission
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
