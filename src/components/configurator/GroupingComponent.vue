<template>
    <div class="">
        <!-- giving numberToSelect and the selectedData.length to the CircularProgress component -->
        <div class="flex justify-between items-center">
            <span class="q-ml-md q-mb-md text-weight-bold article-heading"> {{ element.data[1].label}} </span>
            <CircularProgress :denominator="element.data[1].data[0].numberToSelect" :numerator="selectedData.filter(element => element.group).length"/>
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
        <!-- filter the data, only display the slides that have a label of Story -->
        <q-carousel-slide v-for="(slide, index) in element.data[1].data.filter(element => element.label === 'Story')" :key="index" class="q-pa-none" :name="index">
                <!-- disable the article card if the numberToSelect value reached or another article is selected as the displayed -->
                <ArticleCard
                    class="q-mx-md"
                    style="border-radius: 12px;"
                    :slide="slide.data"
                    :disable="setDisabled(slide)"
                />
                <div>
                    <div>
                        <!-- calling the main configurator to display the content in his body -->
                        <MainConfigurator
                            :numberToSelect="elementsCopy[2].data[0].numberToSelect"
                            :label="elementsCopy[2].label"
                            class="q-mt-sm"
                        >
                            <template v-slot:body>
                                <!-- displaying the products and promotions -->
                                <div
                                    v-for="( element, index ) in elementsCopy[2].data"
                                    :key="index"
                                >
                                    <span class="label q-ml-md">{{ element.label }}</span>
                                    <!-- displaying only the products that have the same storyId as the current slide -->
                                    <CardCarousel
                                        v-if="element.label"
                                        :element="elementsCopy[2].data.find(products => products.label === element.label).data.slice(1).filter(products => products.data[0].storyId === currentSlideId)"
                                        :numberToSelect="elementsCopy[2].data[0].numberToSelect"
                                        :disabledByParent="selectedData.find(singleSelectedData => singleSelectedData.group === true)?.id !== currentSlideId"
                                    />
                                </div>
                            </template>
                        </MainConfigurator>
                    </div>
                </div>
            </q-carousel-slide>
            <!-- this tmeplate contains the buttons for controlling the carousel -->
            <template v-slot:control>
                <!-- the article height comes from the articleCard -->
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
import { defineComponent, onMounted, inject, ref, onBeforeMount, provide, watch, computed, onUnmounted } from 'vue';
import ArticleCard from './cards/ArticleCard.vue'
import CircularProgress from './CircularProgress.vue';
import { cloneDeep } from 'lodash'
import CardCarousel from './CardCarousel.vue';
import MainConfigurator from '../MainConfigurator.vue';
import { selectedDataSymbol, IselectedData } from 'src/types/index'
import { useUserStore } from 'stores/authentication'
import { notify } from './../../functions/notification'
import { ISingleSelectedData } from 'src/types/index'

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
        const userStore = useUserStore()

        //seelctedData is used to display the progress
        const selectedData = ref<ISingleSelectedData[]>([])
        //elementsCopy is a copy of the props to be able to manipulate the data
        const elementsCopy = ref<object>({})
        //this variable is provided to the articles to set the height of the article, so the buttons of the carousel can be set
        const articleHeight = ref(0)
        //currentSlideId is the id of the current slide as a string
        const currentSlideId = ref<string>('')
        //currentSlide is the index of the current slide of the ArticleSelector as a number
        const currentSlide = ref<number>(0)

        //checking the permission for the user, with optional notification
        const checkPermission = (permissionId: string, notifyOnRun: boolean) => {
            if(!userStore.doIHavePermissionFor(permissionId)){
                if(notifyOnRun){
                    notify('Keine Berechtigung')
                }
                return false
            } else {
                return true
            }
        }



        const setDisabled = (card: object): boolean => {
            return (isNumberToSelectReached() && isCardAlreadySelected(card))
        }

        const isCardAlreadySelected = (card: object): boolean => {
            return !selectedData.value.find((element: any) => element.id === card.data[0].id)?.group
        }

        const isNumberToSelectReached = (): boolean => {
            const selectedElementsInSelectedData = selectedData.value.filter((element: any) => element.group)
            return !!props.element.data[1].data[0].numberToSelect && selectedElementsInSelectedData.length >= props.element.data[1].data[0].numberToSelect
        }

        const updateElementInSelectedData = (element: ISingleSelectedData) => {
            const foundIndex = selectedData.value.findIndex(singleSelectedData => singleSelectedData.id === element.id);
            if (foundIndex !== -1) {
                // Replace the element at the found index using splice
                selectedData.value.splice(foundIndex, 1, element);
            } else {
                // Add the element if it's not found
                selectedData.value.push(element)
            }
        };

        const controlGroupInSelectedData = (singleSelectedDataId: string ,props: string[]) => {

            // Check if every prop in props is true in singleSelectedData
            const singleSelectedData = selectedData.value.find(element => element.id === singleSelectedDataId)
            singleSelectedData.group = !props.every(prop => singleSelectedData[prop] === false || singleSelectedData[prop] == '');
        };

        //updating the currentSlideId
        watch(currentSlide, () => {
            currentSlideId.value = props.element.data[1].data.filter((element:any) => element.label === 'Story')[currentSlide.value].data[0].id
        })

        //if the props.element changes, the elementsCopy will be updated deeply
        watch(() => props.element, () => {
            elementsCopy.value = cloneDeep(props.element.data)
        }, { deep: true })

        //if the user removes an article from the selectedData, it means that the selected products cant be selected anymore
        //it will reset the cards selected value

        const resetCardCarousel = computed(() => {
            return selectedData.value.filter(element => element.group).length
        })

        //provideding the currentSlideId
        provide('currentSlideId', currentSlideId)
        //provideding the currentSlide as a number
        provide('currentSlide', currentSlide)
        //children must set the height of the article
        provide('articleHeight', articleHeight)
        //providing the resetCardCarousel value as a trigger variable
        provide('resetCardCarousel', resetCardCarousel)

        //providing a package of functions and data to the children
        provide(selectedDataSymbol, {
            selectedData,
            updateElementInSelectedData,
            controlGroupInSelectedData,
            checkPermission
        })

        //loading the selected stories to the selectedData
        onBeforeMount(() => {
            const index = ref(0)
            for(const story of props.element.data[1].data.filter(element => element.label === 'Story')) {
                index.value++
                if(story.data[0].selected){
                    currentSlideId.value = story.data[0].id
                    currentSlide.value = index.value -1
                }
                updateElementInSelectedData({id: story.data[0].id, button: story.data[0].selected} as ISingleSelectedData)
                controlGroupInSelectedData(story.data[0].id, ['button']);
            }
            //on mount copy the props.element deeply to the elementsCopy, so that the copy can be manipulated by the child components
            elementsCopy.value = cloneDeep(props.element.data)
        })

        onUnmounted(() => {
            selectedData.value = []
        })

        return {
            currentSlide,
            selectedData,
            currentSlideId,
            elementsCopy,
            articleHeight,
            setDisabled,
            resetCardCarousel
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
