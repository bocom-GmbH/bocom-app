<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img class="custom-img" :src="`https://images.bocom.at/${element.find((element: any) => element.label === 'Bild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <div class="flex-column q-pa-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element: any) => element.label === 'Titel').value }}
                {{ element.find((element: any) => element.label === 'Name').value }}
            </div>
            {{ element.find((element: any) => element.label === 'Position').value }}
        </div>

        <q-toggle
            class="q-mt-xs"
            color="positive"
            v-model="elementsCopy[0].selected"
            size="70px"
            :disable="disable || !checkPermission(elementsCopy[0]?.permissionId, false)"
            @click="checkPermission(elementsCopy[0]?.permissionId, true)"
        />
    </q-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, inject, watch } from 'vue'
import { useFileStore } from 'stores/file-store'
import { cloneDeep } from 'lodash';
import { selectedDataSymbol, IselectedData } from 'src/types/index'

export default defineComponent({
    name: 'MitartbeiterCard',
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

        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        //set the selected value on mounted
        onMounted(() => {
            selected.value = props.element[0].selected
        })

        const data = inject(selectedDataSymbol) as IselectedData

        //if the selected state of a card changed update the filestore and the selectedData
        watch(elementsCopy, () => {
            fileStore.update(props.element[0].id, elementsCopy.value);
            ((elementsCopy as any).value[0].selected) ? data.addElementToSelectedData(props.element[0].id) : data.removeElementFromSelectedData(props.element[0].id)
        },{ deep: true })

        return {
            selected,
            elementsCopy,
            checkPermission: data.checkPermission
        }

    }

})
</script>

<style lang="scss" scoped>
.no-wrap {
  width: 100%;

}
.row.inline, .column.inline, .flex.inline {
  display: inline-flex;
  justify-content: center;
}
.custom-card {
  border-radius: 12px;
  min-width: 200px !important;
  min-height: 350px;
}
.custom-img {
  height: 170px;
}
.custom-text {
    font-size: large;
    -webkit-hyphens: auto;
    hyphens: auto;
}

.disabled-bg {
    background-color: $primary-disabled !important; /* or any darker color you prefer */
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
