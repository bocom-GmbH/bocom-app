<template>
   <div>
       <q-input
           rounded
           outlined
           :label="element.label"
           v-model="elementsCopy.data.find((element:any) => element.label === 'Preis').value"
       />
   </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref, watch, onBeforeMount } from 'vue'
import { useFileStore } from 'stores/file-store'
import { cloneDeep } from 'lodash';
import debounce from 'lodash/debounce';

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

        onMounted(() => {
           console.log(props.element)
        })

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        const debouncedUpdate = debounce((elementsCopy, fileStore, id) => {
            fileStore.update(id, elementsCopy.value);
        }, 300);

        watch(elementsCopy, () => {
            debouncedUpdate(elementsCopy, fileStore, elementsCopy.value.data[0].id);
        },{ deep: true })

        return {
            elementsCopy
        }
    }
})


</script>
