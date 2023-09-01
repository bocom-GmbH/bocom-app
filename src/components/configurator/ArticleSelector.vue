<template>
    <div class="q-ma-sm">
        <span class="text-weight-bold article-heading"> {{ element.label }} </span>
        <q-carousel
            animated
            v-model="slide"
            navigation
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled bg-primary q-pa-md q-ma-sm"
            ref="carousel"
        >
        <q-carousel-slide v-for="(slide, index) in data.filter((slide: any) => slide.loading === false)" :key="slide?.data?.EditorialById?.id" class="q-pa-none" :name="index">
              <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
                  <span class="card-title"> {{ slide.data?.EditorialById?.Synopsis_Header }}</span>
                      <div class="synopsys">
                        {{ slide?.data?.EditorialById?.Synopsis_Text }}
                      </div>
                  <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
              </q-card>
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
import { defineComponent, onMounted, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getEditorialById } from '../../apollo/queries/files'


export default defineComponent({
	name: 'ArticleSelector',
	props: {
		element: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const data = ref<any>([])

		const getArticle = (id:string) => {
			try {
				const { onResult } = useQuery(
                    getEditorialById, () => ({
						fileId: id
					}),
					() => ({
						errorPolicy: 'all',
					})
				)
				onResult((result) => {
                    data.value.push(result)
				})
			} catch (error) {
				console.log(error)
			}
		}

		onMounted(() => {
			for(const id of props.element.fileIds){
			  getArticle(id)
			}
		})

		return {
			slide: ref(1),
			shape: ref(['line']),
			data
		}
	}
})
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
