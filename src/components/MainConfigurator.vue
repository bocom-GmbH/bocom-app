<template>
    <div class="">
        <div class="flex justify-between items-center">
            <span class="q-ml-md text-weight-bold article-heading"> {{ label }} </span>
            <CircularProgress :denominator="numberToSelect" :numerator="selectedData.length"/>
        </div>
        <slot name="body"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, onUnmounted } from 'vue'
import CircularProgress from 'src/components/configurator/CircularProgress.vue';
import { selectedDataSymbol } from 'src/types/index';
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
                    notify('Keine Berechtigung')
                }
                return false
            } else {
                return true
            }
        }

        const selectedData = ref<string[]>([])

        //if the elmement is already selected, it will not be added again
        const addElementToSelectedData = (element: string) => {
            selectedData.value.includes(element) ? null : selectedData.value.push(element);
        }

        //if the element is not selected, it will not be removed from the selectedData
        const removeElementFromSelectedData = (element: string) => {
            selectedData.value = selectedData.value.filter(item => item !== element)
        }

        //providing a package of functions and data to the children
        provide(selectedDataSymbol, {
            selectedData,
            addElementToSelectedData,
            removeElementFromSelectedData,
            checkPermission
        })

        //resetting the selectedData on unmount
        onUnmounted(() => {
            selectedData.value = []
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



