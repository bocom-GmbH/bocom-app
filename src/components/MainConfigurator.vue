<template>
    <div class="">
        <!-- this div contains the label and the progressbar -->
        <div class="flex justify-between items-center">
            <span class="q-ml-md text-weight-bold article-heading"> {{ label }} </span>
            <CircularProgress :denominator="numberToSelect" :numerator="selectedData.filter(element => element.group ).length"/>
        </div>
        <!-- every content with template = body from outside comes here -->
        <slot name="body"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import CircularProgress from 'src/components/configurator/CircularProgress.vue';
import { selectedDataSymbol, ISingleSelectedData } from 'src/types/index';
import { notify } from './../functions/notification'
import { useUserStore } from 'stores/authentication'

export default defineComponent({
    name: 'MainConfigurator',
    components: {
        CircularProgress
    },
    props: {
        label: {
            type: String,
            required: true
        },
        numberToSelect: {
            type: Number,
            required: false
        }
    },
    setup () {
        const userStore = useUserStore()

        //checking the permission for the user, with optional notification
        const checkPermission = (permissionId: string, notifyOnRun: boolean) => {
            if(!userStore.doIHavePermissionFor(permissionId)){
                if(notifyOnRun){
                    //make a notification
                    notify('Keine Berechtigung')
                }
                return false;
            } else {
                return true;
            }
        }

        const selectedData = ref<ISingleSelectedData[]>([])

        //if the elmement is already selected, it will not be added again
        const updateElementInSelectedData = (element: ISingleSelectedData) => {
            const foundIndex = selectedData.value.findIndex(singleSelectedData => singleSelectedData.id === element.id);
            if (foundIndex !== -1) {
                // Replace the element at the found index using splice
                selectedData.value.splice(foundIndex, 1, element);
            } else {
                // Add the element if it's not found
                selectedData.value.push(element)
            }
        };

        const controlGroupInSelectedData = (singleSelectedDataId: string, props: string[]) => {

            // Check if every prop in props is true in singleSelectedData
            const singleSelectedData = selectedData.value.find(element => element.id === singleSelectedDataId)
            singleSelectedData.group = !props.some(prop => {
                const value = singleSelectedData[prop] === false || singleSelectedData[prop] == ''
                return value
            });
        };

        //if the element is not selected, it will not be removed from the selectedData
        const removeElementFromSelectedData = (id: string) => {
            selectedData.value = selectedData.value.filter( singleSelectedData => singleSelectedData.id != id)
        }

        //providing a package of functions and data to the children
        provide(selectedDataSymbol, {
            selectedData,
            updateElementInSelectedData,
            removeElementFromSelectedData,
            checkPermission,
            controlGroupInSelectedData
        })

        return {
            selectedData
        }
    }
})


</script>

<style scoped>

.article-heading {
  font-size: 22px;
}

</style>



