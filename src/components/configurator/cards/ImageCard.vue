<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img class="custom-img" :src="`https://images.bocom.at/${elementsCopy[1].value}`">
            <!-- this div makes the picture gray if the card is disabled -->
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
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
import { defineComponent, onBeforeMount, ref, inject, watch } from 'vue'
import { useFileStore } from 'stores/file-store'
import { useUserStore } from 'stores/authentication'
import { cloneDeep } from 'lodash'
import { selectedDataSymbol, ISelectedData } from 'src/types/index'

export default defineComponent({
    name: 'ImageCard',
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
        const fileStore = useFileStore()
        const elementsCopy = ref<object>({})
        const userStore = useUserStore()

        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
            data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected})
        })

        const data = inject(selectedDataSymbol) as ISelectedData

        //if the selected state of an image changed update the filestore and the selectedData
        watch(elementsCopy, () => {
            fileStore.update(props.element[0].id, elementsCopy.value);
            data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected})
            data.controlGroupInSelectedData(props.element[0].id, ['button'])
        }, { deep: true })

        return {
            elementsCopy,
            userStore,
            checkPermission: data.checkPermission
        }

    }

})
</script>

<style lang="scss" scoped>
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
  height: 350px;
}
.custom-text {
  font-size: large;
}

.disabled-bg {
    background-color: $primary-disabled !important;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
