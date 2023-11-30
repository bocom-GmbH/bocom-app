<template>
    <div class="q-ma-sm">
        <q-card flat class="q-ma-sm q-pt-lg q-pa-md bg-primary card" style="display: flex; flex-direction: column; gap: 10px;">
            <div v-for="(input, index) of element.filter((input: any) => input.label)" :key="index">

                <div class="q-mb-sm text-weight-bold input-title"> {{ input.label }} </div>
                <InputField
                    :element="input.data"
                />
            </div>

        </q-card>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
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

        return {}
    }
})
</script>

<style scoped>
.card {
    border-radius: 12px;
}
.input-title {
    font-size: 1.1rem;
    color: black;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
