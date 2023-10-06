<template>
    <div class="q-ma-sm">
        <div class="flex justify-between items-center ">
            <span class="text-weight-bold article-heading"> {{ label }} </span>
            <CircularProgress v-if="numberToSelect" :denominator="numberToSelect" :numerator="selectedData.length"/>
        </div>
        <slot name="body"> </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import CircularProgress from 'src/components/configurator/CircularProgress.vue';

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

        const selectedData = ref([])

        provide('selectedData',selectedData)

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



