<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img style="border-radius: 0px;" class="custom-img q-mt-md bg-primary" fit="scale-down" :src="`https://images.bocom.at/${element.find((element: any) => element.label === 'Bild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <div class="flex-column q-pa-none q-px-sm no-wrap">
            <div class="custom-text q-mb-none text-weight-bold text-left">
                {{ element.find((element: any) => element.label === 'Name').value }}
            </div>
               <!--  € {{ element.find((element: any) => element.label === 'Preis').value }} <br>
                {{ element.find((element: any) => element.label === 'Menge').value }} -->
            <q-input
                :disable="!elementsCopy[0].selected"
                v-model="elementsCopy.find((element: any) => element.label === 'Preis').value"
                label="Preis"
                outlined
                rounded
                color="secondary"
            ></q-input>
            <br>
            <q-input
                :disable="!elementsCopy[0].selected"
                v-model="elementsCopy.find((element: any) => element.label === 'Menge').value"
                label="Menge"
                outlined
                rounded
                color="secondary"
            ></q-input>
        </div>

        <q-toggle
            class="q-mt-none"
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
import { selectedDataSymbol, IselectedData } from 'src/types/index'

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
        const fileStore = useFileStore()
        const elementsCopy = ref<object>({})
        const data = inject(selectedDataSymbol) as IselectedData

        //make a deep copy of the props.element on before mount, so that we can manipulate the elements
        onBeforeMount(() => {
            elementsCopy.value = cloneDeep(props.element)
        })

        //if the template changes, update the element
        watch(() => props.element, () => {
            elementsCopy.value = cloneDeep(props.element)
        }, { deep: true })

        const setDisaabled = () => {
            if(data.selectedData.value.filter(data => data.group === true).length >= 2){
                return true
            } else {
                return false
            }
        }


        //if the user selects or deselects the element, update the element in the template and the selectedData
        watch(elementsCopy, (newValue, oldValue) => {
            if (!elementsCopy.value[0].selected) {
                elementsCopy.value.find((element: any) => element.label === 'Menge').value = '';
                elementsCopy.value.find((element: any) => element.label === 'Preis').value = '';
                data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected, Menge: '', Preis: '' });
            } else if (elementsCopy.value[0].selected && elementsCopy.value.find((element: any) => element.label === 'Menge').value !== '' && elementsCopy.value.find((element: any) => element.label === 'Preis').value !== '') {
                data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected, Menge: elementsCopy.value.find((element: any) => element.label === 'Menge').value, Preis: elementsCopy.value.find((element: any) => element.label === 'Preis').value });
            } else if (elementsCopy.value.find((element: any) => element.label === 'Menge').value === '') {
                data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected, Menge: '', Preis: elementsCopy.value.find((element: any) => element.label === 'Preis').value });
            } else if (elementsCopy.value.find((element: any) => element.label === 'Preis').value === '') {
                data.updateElementInSelectedData({id: props.element[0].id, button: elementsCopy.value[0].selected, Menge: elementsCopy.value.find((element: any) => element.label === 'Menge').value , Preis: ''});
            }
            data.controlGroupInSelectedData(props.element[0].id ,['button', 'Menge', 'Preis']);
            fileStore.update(props.element[0].id, elementsCopy.value);

            //console.log(elementsCopy.value.filter(element => element.label === 'Preis' || 'Menge'))
            //((elementsCopy as any).value[0].selected) ? data.addElementToSelectedData(props.element[0].id) : data.removeElementFromSelectedData(props.element[0].id)
        },{ deep: true })

        return {
            elementsCopy,
            setDisaabled
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
}

.disabled-bg {
    background-color: $primary-disabled !important;
}


/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
