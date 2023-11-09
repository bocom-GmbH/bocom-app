<template>
   <div class="flex row" style="width: 100%">
       <q-input
           rounded
           outlined
           :label="elementsCopy[1].label"
           v-model="elementsCopy[1].value"
           color="secondary"
           class="input"
       />
       <q-input
           rounded
           outlined
           :label="elementsCopy[2].label"
           v-model="elementsCopy[2].value"
           color="secondary"
           class="input"
       />

       <!-- {{ elementsCopy }} -->
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

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        const debouncedUpdate = debounce((elementsCopy, fileStore, id) => {
            fileStore.update(id, elementsCopy.value);
        }, 300);

        watch(elementsCopy, () => {
            if(JSON.stringify(elementsCopy.value) === JSON.stringify(props.element)) {
                return;
            } else {
                debouncedUpdate(elementsCopy, fileStore, elementsCopy.value.data[0].id);
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
.input {
    width:50%;
}
</style>
