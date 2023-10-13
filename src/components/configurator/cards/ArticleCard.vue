<template>
     <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
        <span class="card-title text-h5"> {{ slide.find((element:any) => element.label === 'Titel').value }} </span> <br> <br>
       <!--  <span class="card-title text-left"> {{ slide.find((element:any) => element.label === 'Untertitel').value }} </span> -->
            <div class="synopsys text-left" v-html="slide.find((element:any) => element.label === 'Text').value">
            </div>
        <q-toggle
            class="q-mt-xs"
            color="positive"
            size="70px"
            v-model="elementsCopy[0].selected"
            val="xl"
            label=""
            :disable="disable"
        />
    </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, inject, watch } from 'vue'
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store'

export default defineComponent({
    name: 'ArticleCard',
    props: {
        slide: {
            type: Object,
            required: true
        },
        disable: {
            type: Boolean,
            required: false
        }
    },
    setup(props) {
        const selected = ref<boolean>(false)
        const fileStore = useFileStore()
        const elementsCopy = ref<object>({})

        const currentSlideId = ref(inject('currentSlideId'))

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.slide)
            currentSlideId.value = elementsCopy.value[0].id
        })

        const selectedData = inject('selectedData')

        watch(elementsCopy, () => {
            if(JSON.stringify(elementsCopy.value) === JSON.stringify(props.slide)) {
                return;
            } else {

                fileStore.update(props.slide[0].id, elementsCopy.value)
                if ((elementsCopy as any).value[0].selected) {
                    (selectedData as any).value.push(props.slide[0].id)
                } else {
                    (selectedData as any).value = (selectedData as any).value.filter((item: any) => item !== props.slide[0].id)
                }

            }

        },{ deep: true })

        return {
            selected,
            elementsCopy
        }

    }

})

</script>
