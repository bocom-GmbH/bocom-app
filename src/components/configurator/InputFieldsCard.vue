<template>
    <div class="q-ma-sm">
        <q-card flat class="q-ma-sm q-pt-lg q-pa-md bg-primary card" style="display: flex; flex-direction: column; gap: 10px;">
            <div v-for="(input, index) in filteredInputs" :key="index">
                <div class="q-mb-sm text-weight-bold input-title">{{ input.label }}</div>
                <InputField :element="input.data" />
            </div>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InputField from 'src/components/configurator/cards/InputField.vue';

const props = defineProps({
    element: {
        type: Object,
        required: true
    }
});

// Computed property to filter inputs with labels
const filteredInputs = computed(() => {
    return props.element.filter((input: any) => input.label);
});
</script>

<style scoped>
.card {
    border-radius: 12px;
}
.input-title {
    font-size: 1.1rem;
    color: black;
}

/* Since direct import is not working, consider including styles in a global stylesheet or verify the path and setup */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
