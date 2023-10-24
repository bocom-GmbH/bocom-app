<template>
    <div>
        <q-circular-progress
          show-value
          class="text-accent q-ma-sm q-mr-md"
          :value="fractionToPercent"
          size="48px"
          :color="progressColor"
        >
            <div
                :style="{ color: `var(--q-${progressColor})`}"
                v-if="denominator"
            >
                {{ progress }}
            </div>
        </q-circular-progress>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onUnmounted } from 'vue'

export default defineComponent({
    name: 'LimitIndicator',
    props: {
        numerator: {
            type: Number,
            required: true
        },
        denominator: {
            type: Number,
            required: false
        }
    },
    setup(props) {

        const fractionToPercent = computed(() => {
            if (!props.denominator) return 0;
            return (props.numerator / props.denominator) * 100;
        });

        const progressColor = computed(() => {
            if (props.numerator === props.denominator) {
                return 'positive';
            } else if( props.numerator > props.denominator) {
                return 'negative';
            } else {
                return 'secondary';
            }
        });

        onUnmounted(() => {
            fractionToPercent.value = 0;
        });

        const progress = computed(() => `${props.numerator}/${props.denominator}`);

        return {
            fractionToPercent,
            progress,
            progressColor
        }
    }
})
</script>

<style scoped>
</style>
