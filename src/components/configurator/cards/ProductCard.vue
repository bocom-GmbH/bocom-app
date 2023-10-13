<template>
    <q-card class="custom-card bg-primary q-my-md flex">
        <q-img class="custom-img" fit="scale-down" :src="`https://images.bocom.at/${element.find((element: any) => element.label === 'Bild').value}`"></q-img>
        <div class="flex-column q-pa-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element: any) => element.label === 'Name').value }}
            </div>
             € {{ element.find((element: any) => element.label === 'Preis').value }} <br>
             {{ element.find((element: any) => element.label === 'Menge').value }}
        </div>

        <q-toggle
            class="q-mt-xs"
            color="positive"
            v-model="elementsCopy[0].selected"
            size="70px"
            :disable="disable"
        />
    </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, inject, watch } from 'vue'
import { useFileStore } from 'stores/file-store'
import { cloneDeep } from 'lodash';

export default defineComponent({
    name: 'ProductCard',
    props: {
        element: {
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

        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })


        onMounted(() => {
            selected.value = props.element[0].selected
        })

        const selectedData = inject('selectedData')

        watch(elementsCopy, () => {
            fileStore.update(props.element[0].id, elementsCopy.value)
            if ((elementsCopy as any).value[0].selected) {
                (selectedData as any).value.push(props.element[0].id)
            } else {
                (selectedData as any).value = (selectedData as any).value.filter((item: any) => item !== props.element[0].id)
            }

        },{ deep: true })

        return {
            selected,
            elementsCopy
        }

    }

})
</script>

<style scoped>
.no-wrap {
  width: 100%;
  word-break: break-all;
}
.row.inline, .column.inline, .flex.inline {
  display: inline-flex;
  justify-content: center;
}
.custom-card {
  border-radius: 12px;
  min-width: 200px !important;
}
.custom-img {
  height: 170px;
}
.custom-text {
  font-size: large;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>