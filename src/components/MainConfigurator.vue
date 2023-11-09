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
import { Notify } from 'quasar'

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

        const notify = (message: string) => {
            Notify.create({
                message: message,
                position: 'top',
                timeout: 1500,
                color: 'red',
                progress: true
            });
        }

        const selectedData = ref<string[]>([])

        const addElementToSelectedData = (element: string) => {
            selectedData.value.push(element)
        }

        const removeElementFromSelectedData = (element: string) => {
            selectedData.value = selectedData.value.filter(item => item !== element)
        }

        provide(selectedDataSymbol, {
            selectedData,
            addElementToSelectedData,
            removeElementFromSelectedData,
            notify
        })

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



