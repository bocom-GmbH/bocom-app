<template>
   <div class="" >
       <div>
           <q-input
               v-for="(input, index) of elementsCopy.filter((element: any) => element.label)" :key="index"
               class="q-mb-sm"
               rounded
               outlined
               :label="input.label"
               v-model="input.value"
               color="secondary"
           />
       </div>
   </div>

</template>

<script lang="ts">

import { defineComponent, inject, ref, watch, onBeforeMount } from 'vue'
import { useFileStore } from 'stores/file-store'
import { cloneDeep } from 'lodash';
import debounce from 'lodash/debounce';
import { selectedDataSymbol, IselectedData } from 'src/types/index';


export default defineComponent({
    mame: 'InputField',
    props: {
        element: {
            type: Object,
            required: true
        }
    },
    setup(props){
        const fileStore = useFileStore()
        const elementsCopy = ref<any>({})
        const selectedData = inject(selectedDataSymbol) as IselectedData

        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        //debounce the update of the filestore
        const debouncedUpdate = debounce((elementsCopy: any, fileStore, id: string) => {
            fileStore.update(id, elementsCopy.value);
        }, 300);

        //watch the elementsCopy and if the content changes update the filestore
        watch(elementsCopy, () => {
            if(elementsCopy.value.filter(element => element.label).every(element => element.value)){
                selectedData.addElementToSelectedData(elementsCopy.value[0].id)
            } else {
                selectedData.removeElementFromSelectedData(elementsCopy.value[0].id)
            }
            if(JSON.stringify(elementsCopy.value) === JSON.stringify(props.element)) {
                return;
            } else {
                debouncedUpdate(elementsCopy, fileStore, elementsCopy.value[0].id);
            }
        }, { deep: true })

        return {
            elementsCopy,
            test: ref('')
        }
    }
})


</script>

<style scoped>

</style>
