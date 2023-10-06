<template>
     <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
        <span class="card-title text-h5"> {{ slide.find((element:any) => element.label === 'Titel').value }} </span> <br>
        <span class="card-title text-h6"> {{ slide.find((element:any) => element.label === 'Untertitel').value }} </span>
            <div class="synopsys">
                {{ slide.find((element:any) => element.label === 'Text').value }}
            </div>
        <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="elementsCopy[0].selected" @update:model-value="toggleChanged(slide.id)" val="xl" label=""/>
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
        }
    },
    setup(props) {
        const fileStore = useFileStore()
        const elementsCopy = ref<object>({})

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.slide)
        })

        const setSelected = () => {
            return (inject('selectedData') as any).value.includes(props.slide[0].id)
        }

        const selected = ref<boolean>(setSelected())
        const selectedData = inject('selectedData')
        const toggleChanged = (id: string) => {
            fileStore.update(props.slide[0].id, elementsCopy.value)
            if (selected.value) {
                (selectedData as any).value.push(props.slide[0].id)
            } else {
                (selectedData as any).value =(selectedData as any).value.filter((item: any) => item !== props.slide[0].id)
            }
        }

        return {
            selected,
            toggleChanged,
            elementsCopy
        }

    }

})

</script>
