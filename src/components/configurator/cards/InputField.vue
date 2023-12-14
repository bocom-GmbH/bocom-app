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
        const data = inject(selectedDataSymbol) as IselectedData
        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
            /* console.log(elementsCopy.value, 'inputFiled') */
        })

        //debounce the update of the filestore
        const debouncedUpdate = debounce((elementsCopy: any, fileStore, id: string) => {
            fileStore.update(id, elementsCopy.value);
        }, 300);

        const getSelectedDataObject = () => {
            let dataObject = {
                id: elementsCopy.value[0].id
            }
            for(const element of elementsCopy.value.filter(element => element.label)){
                if(!dataObject[element.label]){
                    dataObject[element.label] = element.value
                }
            }
            return dataObject
        }


        //watch the elementsCopy and if the content changes update the filestore
        watch(elementsCopy, () => {
            data.updateElementInSelectedData(getSelectedDataObject());
            data.controlGroupInSelectedData(props.element[0].id ,Object.keys(getSelectedDataObject()).filter(key => key !== 'id'));
            debouncedUpdate(elementsCopy, fileStore, elementsCopy.value[0].id);
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
