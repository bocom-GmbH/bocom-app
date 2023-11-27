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
                <div>
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
                                        :disabledByParent="selectedData[0] !== currentSlideId"
                                    />
                                </div>
                            </template>
                        </MainConfigurator>
                    </div>
                </div>
            </q-carousel-slide>
            <template v-slot:control>
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
import { Notify } from 'quasar'

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
        const resetCardCarousel = ref(0);
        const selectedData = ref<string[]>([])
        const elementsCopy = ref<object>({})
        const articleHeight = ref(0)
        const currentSlideId = ref('')
        const currentSlide = ref(0)

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

        const notify = (message: string) => {
            Notify.create({
                message: message,
                position: 'top',
                timeout: 1500,
                color: 'red',
                progress: true
            });
        }


        //if the elmement is already selected, it will not be added again
        const addElementToSelectedData = (element: string) => {
            selectedData.value.includes(element) ? null : selectedData.value.push(element);
        }

        const removeElementFromSelectedData = (element: string) => {
            selectedData.value = selectedData.value.filter(item => item !== element)
        }

        //make the carousel available if the parent is selected
        const deisableCarousel = computed(() => {
            return !(currentSlideId.value === selectedData.value[0])
        })

        //updating the currentSlideId
        watch(currentSlide, () => {
            currentSlideId.value = props.element.data[1].data.filter((element:any) => element.label === 'Story')[currentSlide.value].data[0].id
        })

        //if the props.element changes, the elementsCopy will be updated deeply
        watch(() => props.element, () => {
            elementsCopy.value = cloneDeep(props.element.data)
        }, { deep: true })

        watch(selectedData, (newValue, oldValue) => {
            if (oldValue.length !== newValue.length) resetCardCarousel.value++;
        } ,{ deep: true })

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
            addElementToSelectedData,
            removeElementFromSelectedData,
            checkPermission
        })

        //loading the selected stories to the selectedData
        onBeforeMount(() => {
            const index = ref(0)
            for(const story of props.element.data[1].data.filter(element => element.label === 'Story')) {
                index.value++
                if(story.data[0].selected){
                    addElementToSelectedData(story.data[0].id)
                    currentSlideId.value = story.data[0].id
                    break;
                }
            }
            currentSlide.value = index.value -1
            //on mount copy the props.element deeply to the elementsCopy
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
            deisableCarousel
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
