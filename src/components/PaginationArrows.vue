<template>
    <div class="flex justify-around q-mt-md" style="width: 100%">
        <q-btn
            icon="las la-step-backward"
            color="secondary"
            :disable="currentSite === 0"
            @click="currentSite = 0"
            flat
        />
        <q-btn
            icon="las la-angle-double-left"
            color="secondary"
            :disable="currentSite - 2 < 0"
            @click="currentSite - 2 > 0 ? currentSite -= 2 : null"
            flat
        />
        <q-btn
            icon="las la-angle-left"
            color="secondary"
            :disable="currentSite === 0"
            @click="currentSite > 0 ? currentSite-- : null"
            flat
        />
        <q-btn
            icon="las la-angle-right"
            color="secondary"
            :disable="currentSite === props.maxLength - 1"
            @click="props.maxLength > currentSite ? currentSite++ : null"
            flat
        />
        <q-btn
            icon="las la-angle-double-right"
            color="secondary"
            :disable="currentSite + 2 >= props.maxLength"
            @click="currentSite + 2 < props.maxLength ? currentSite += 2 : null"
            flat
        />
        <q-btn
            icon="las la-step-forward"
            color="secondary"
            :disable="currentSite === props.maxLength - 1"
            @click="currentSite = props.maxLength - 1"
            flat
        />
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Ref } from 'vue';

const currentSite = inject<Ref<number>>('currentSite');

const props = defineProps({
    maxLength: {
        type: Number,
        required: true
    }
});
</script>
