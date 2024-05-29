<template>
    <div>
        <q-circular-progress
            show-value
            class="text-accent q-ma-sm q-mr-md"
            :value="fractionToPercent"
            size="48px"
            :color="progressColor"
        >
            <div :style="{ color: `var(--q-${progressColor})`}" v-if="denominator">
                {{ progress }}
            </div>
        </q-circular-progress>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue';

const props = defineProps({
    numerator: {
        type: Number,
        required: true
    },
    denominator: {
        type: Number,
        default: 1 // set a default to avoid division by zero
    }
});

// Calculate a percentage from the numerator and denominator
const fractionToPercent = computed(() => {
    if (!props.denominator) return 0;
    return (props.numerator / props.denominator) * 100;
});

// Determine the progress color based on the relationship between numerator and denominator
const progressColor = computed(() => {
    if (props.numerator === props.denominator) {
        return 'positive';
    } else if (props.numerator > props.denominator) {
        return 'negative';
    } else {
        return 'secondary';
    }
});


/* onUnmounted(() => {

}); */

const progress = computed(() => `${props.numerator}/${props.denominator}`);

</script>

<style scoped>
</style>
