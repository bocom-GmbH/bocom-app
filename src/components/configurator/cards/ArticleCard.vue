<template>
    <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
        <span class="card-title text-h5"> {{ slide.find((element:any) => element.label === 'Titel').value }} </span> <br> <br>
        <div  ref="divRef" class="synopsys q-pr-sm">
            <div class="fixed-height text-left" v-html="slide.find((element:any) => element.label === 'Text').value">
            </div>
        </div>
        <q-toggle
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
import { defineComponent, onBeforeMount, ref, inject, watch, onMounted } from 'vue'
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store'
import { selectedDataSymbol, IselectedData } from 'src/types/index'

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
        const articleHeight = ref<number | null>(inject('articleHeight', null));
        const currentSlideId = ref(inject('currentSlideId'))
        const divRef = ref(null);



        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.slide)
            currentSlideId.value = elementsCopy.value[0].id
        })

        onMounted(()=> {
            if (divRef.value) {
                articleHeight.value = divRef.value.offsetHeight;
            }
        })

        const data = inject(selectedDataSymbol) as IselectedData

        watch(elementsCopy, () => {
            if(JSON.stringify(elementsCopy.value) === JSON.stringify(props.slide)) {
                return;
            } else {

                fileStore.update(props.slide[0].id, elementsCopy.value)
                if ((elementsCopy as any).value[0].selected) {
                    data.addElementToSelectedData(props.slide[0].id)
                } else {
                    data.removeElementFromSelectedData(props.slide[0].id)
                }

            }

        },{ deep: true })

        return {
            selected,
            elementsCopy,
            divRef
        }

    }

})

</script>

<style scoped>
.card-styled{
    height: auto;
}
.synopsys {
    max-height: 185px;
    overflow: auto;
    margin: 0 !important;

}
</style>
