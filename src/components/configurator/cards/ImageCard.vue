<template>
    <q-card :class="{'custom-card bg-primary q-my-md flex': true, 'disabled-bg': disable}">
        <q-img class="custom-img" :src="`https://images.bocom.at/${elementsCopy[1].value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <q-toggle
            class="q-mt-xs"
            color="positive"
            v-model="elementsCopy[0].selected"
            size="70px"
            :disable="disable || !checkPermission(elementsCopy[0]?.permissionId, false)"
            @click="checkPermission(elementsCopy[0]?.permissionId, true)"
        />
    </q-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, inject } from 'vue';
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store';
import { useUserStore } from 'stores/authentication';
import { selectedDataSymbol, ISelectedData } from 'src/types/index';

const props = defineProps({
    element: {
        type: Object,
        required: true
    },
    disable: {
        type: Boolean,
        default: false
    }
});

const elementsCopy = ref(cloneDeep(props.element));
const fileStore = useFileStore();
const userStore = useUserStore();
const data = inject(selectedDataSymbol) as ISelectedData;

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.element);
    data.updateElementInSelectedData({
        id: props.element[0].id,
        button: elementsCopy.value[0].selected
    });
});

watch(elementsCopy, (newVal, oldVal) => {
    fileStore.update(props.element[0].id, elementsCopy.value);
    data.updateElementInSelectedData({
        id: props.element[0].id,
        button: elementsCopy.value[0].selected
    });
    data.controlGroupInSelectedData(props.element[0].id, ['button']);
}, { deep: true });

const checkPermission = (id: string, emitEvent: boolean) => data.checkPermission(id, emitEvent);
</script>

<style lang="scss" scoped>
.no-wrap {
  width: 100%;
  word-break: break-all;
}
.row.inline, .column.inline, .flex.inline {
  display: inline-flex;
  justify-content: center;
}
.custom-card {
  border-radius: 12px;
  min-width: 200px !important;
}
.custom-img {
  height: 350px;
}
.custom-text {
  font-size: large;
}

.disabled-bg {
    background-color: $primary-disabled !important;
}
</style>
