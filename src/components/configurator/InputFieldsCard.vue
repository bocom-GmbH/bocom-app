<template>
    <div class="q-ma-sm flex items-center">
        <q-card class="q-ma-sm q-pa-md bg-primary flex card">
           <div class="first-column flex">
                <div v-for="(input, index) of element.filter((input: any) => input.label)" :key="index">
                  <InputField
                    :element="input"
                  />
                </div>
           </div>
        </q-card>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref, watch, onBeforeMount } from 'vue'
import InputField from 'src/components/configurator/cards/InputField.vue'


export default defineComponent({
    name: 'InputFieldsCard',
    props: {
        element: {
            type: Object,
            required: true
        }
    },
    components: {
        InputField
    },
    setup () {

        return {
            text: ref('Placeholder'),
            progress: ref(55)
        }
    }
})
</script>

<style scoped>
.article-heading {
  font-size: 22px;
}
.first-column {
    width: 70%;
    gap: 15px;
}
.second-column {
    width: 30%;
    gap: 15px;
}
.card {
    border-radius: 12px;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
