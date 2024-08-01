<template>
    <div
        class="navigation-container"
    >
        <div
            class="button-container"
            :style="currentSite === 0 ? 'opacity: 0.25' : ''"
        >
            <q-btn
                icon="las la-step-backward"
                color="secondary"
                :disable="currentSite === 0"
                @click="currentSite = 0"
                flat
                dense
            />
            <div :style="currentSite - 1 === 0 ? 'opacity: 0.25' : ''">
                <q-btn
                    icon="las la-angle-double-left"
                    color="secondary"
                    :disable="currentSite - 1 < 0"
                    @click="currentSite - 1 > 0 ? currentSite -= 2 : null"
                    flat
                    dense
                />
            </div>
            <q-btn
                icon="las la-angle-left"
                color="secondary"
                :disable="currentSite === 0"
                @click="currentSite > 0 ? currentSite-- : null"
                flat
                dense
            />
        </div>
        <div class="label-container">
            {{ components?.label }}
        </div>
        <div
            class="button-container"
            :style="currentSite === props.maxLength - 1 ? 'opacity: 0.25' : ''"
        >
            <q-btn
                icon="las la-angle-right"
                color="secondary"
                :disable="currentSite === props.maxLength - 1"
                @click="props.maxLength > currentSite ? currentSite++ : null"
                flat
                dense
            />
            <div :style="currentSite + 2 === props.maxLength ? 'opacity: 0.25': ''">
                <q-btn
                    icon="las la-angle-double-right"
                    color="secondary"
                    :disable="currentSite + 2 >= props.maxLength"
                    @click="currentSite + 2 < props.maxLength ? currentSite += 2 : null"
                    flat
                    dense
                />
            </div>
            <q-btn
                icon="las la-step-forward"
                color="secondary"
                :disable="currentSite === props.maxLength - 1"
                @click="currentSite = props.maxLength - 1"
                flat
                dense
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useFileStore } from 'stores/file-store';

const currentSite = inject<Ref<number>>('currentSite');
const fileStore = useFileStore();
const components = ref<any>(fileStore.getCurrentSiteComponents());

const props = defineProps({
    maxLength: {
        type: Number,
        required: true
    }
});

watch(fileStore.getCurrentSiteComponents, () => {
    components.value = fileStore.getCurrentSiteComponents();
});
</script>

<style scoped>
.label-container {
    width: 25%;
    justify-content: center;
    display: flex;
}

.button-container {
    width: 33%;
    justify-content: space-between;
    display: flex;
}

.navigation-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
}
</style>
