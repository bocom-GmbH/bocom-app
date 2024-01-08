<template>
    <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
        <span class="card-title text-h5"> {{ slide.find((element:any) => element.label === 'Titel').value }} </span> <br> <br>
        <div ref="divRef" class="synopsys q-pr-sm">
            <div class="fixed-height text-left" v-html="slide.find((element:any) => element.label === 'Text').value">
            </div>
        </div>
        <q-toggle
            color="positive"
            size="70px"
            v-model="elementsCopy[0].selected"
            val="xl"
            label=""
            :disable="disable || !checkPermission(elementsCopy[0]?.permissionId, false)"
            @click="checkPermission(elementsCopy[0]?.permissionId, true)"
        />
    </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, inject, watch, onMounted } from 'vue'
import { cloneDeep } from 'lodash'
import { useFileStore } from 'stores/file-store'
import { selectedDataSymbol, ISelectedData } from 'src/types/index'

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
        const selected = ref<boolean>(false);
        const fileStore = useFileStore();
        const elementsCopy = ref<object>({});
        const articleHeight = ref<number | null>(inject('articleHeight', null));
        const currentSlideId = ref(inject('currentSlideId'));
        const currentSlide = ref(inject('currentSlide'));
        const divRef = ref(null);

        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        //and set the currentSlideId
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.slide)
            currentSlideId.value = elementsCopy.value[0].id
            //data.updateElementInSelectedData({id: props.slide[0].id, button: elementsCopy.value[0].selected})
        })

        //set the height of the article
        onMounted(()=> {
            if (divRef.value) {
                articleHeight.value = divRef.value.offsetHeight;
            }
        })

        const data = inject(selectedDataSymbol) as ISelectedData

        //if the selected state changes, update the filestore and the selectedData
        watch(elementsCopy, () => {
            if(JSON.stringify(elementsCopy.value) === JSON.stringify(props.slide)) {
                return;
            } else {
                data.updateElementInSelectedData({id: props.slide[0].id, button: elementsCopy.value[0].selected});
                data.controlGroupInSelectedData(props.slide[0].id, ['button']);
                fileStore.update(props.slide[0].id, elementsCopy.value);
            }

        },{ deep: true })

        //if the user changes a slide update the height of the article with delay
        watch(currentSlideId, () => {
            if (props.slide[0].id === currentSlideId.value) {
                setTimeout(() => {
                    articleHeight.value = divRef.value.offsetHeight;
                }, 10);
            }
        })

        return {
            selected,
            elementsCopy,
            divRef,
            checkPermission: data.checkPermission,
            currentSlideId,
            currentSlide
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
