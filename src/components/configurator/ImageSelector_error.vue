<template>
    <div class="q-pa-md">
        <span class="text-weight-bold title-text">Titelbild auswahlen</span>
        {{ data?.data?.TitelbildById?.Bilder }}
        <q-carousel
            animated
            v-model="slide"
            navigation
            ref="carousel"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styling bg-primary"
        >
           <q-carousel-slide v-for="(slide, index) in data?.data?.TitelBildById?.Bilder" :key="index" :name="index">
            {{ slide }}
                 <q-card class="carousel-card">
                    <q-img class="carousel-image" fit="fill" src="https://images.bocom.at/000000001.jpg"></q-img>
                </q-card>
                <div class="toggle-wrapper">
                    <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
                </div>
            </q-carousel-slide>

           <!--  <template v-slot:control>
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
            </template> -->
       </q-carousel>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import { getTitelBildById } from '../../apollo/queries/files'


export default defineComponent({
    name: 'ImageSelector',
    props: {
        element: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const data = ref<any>([])
        const getTitleImageById = (id: string) => {
            try {
                const { onResult } = useQuery(
                    getTitelBildById, () => ({
                        fileId: id
                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {
                    console.log(result)
                    data.value = result
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        onMounted(() => {
            getTitleImageById(props.element.fileIds[0])
        })
        console.log(data.value)
        return {
            slide: ref(1),
            shape: ref(['line']),
            data
        }
    }
})
</script>

<style scoped>
.title-text {
    font-size: 22px;
}

.carousel-styling {
    height: 650px;
    border-radius: 12px;
}

.carousel-card {
    height: 500px;
    border-radius: 12px;
}

.carousel-image {
    height: 500px;
}

.toggle-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
