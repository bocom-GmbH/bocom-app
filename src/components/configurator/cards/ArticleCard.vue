<template>
    <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
        <span class="card-title text-h5">
            {{ slide.find((element) => element.label === 'Titel').value }}
        </span>
        <q-img v-if="slide.find((element) => element.label === 'Titelbild')" style="border-radius: 0px;" class="custom-img q-mt-md bg-primary" fit="scale-down" :src="`https://images.bocom.at/${slide.find((element) => element.label === 'Titelbild').value}`">
            <div v-if="disable" class="absolute-full text-subtitle2 flex flex-center"></div>
        </q-img>
        <br> <br>
        <div ref="divRef" class="synopsys q-pr-sm">
            <div class="fixed-height text-left" v-html="slide.find((element) => element.label === 'Text').value"></div>
        </div>
        <div class="flex justify-between items-center">
            <div>
                <q-btn
                    v-show="props.buttons.hasBackButton"
                    round
                    dense
                    color="white"
                    text-color="black"
                    icon="chevron_left"
                    @click="$emit('previousSlide')"
                />
            </div>
            <q-toggle
                color="positive"
                size="70px"
                v-model="elementsCopy[0].selected"
                val="xl"
                label=""
                :disable="disable || !checkPermission(elementsCopy[0]?.permissionId, false)"
                @click="checkPermission(elementsCopy[0]?.permissionId, true)"
            />
            <div>
                <q-btn
                    v-show="props.buttons.hasNextButton"
                    round
                    dense
                    color="white"
                    text-color="black"
                    icon="chevron_right"
                    @click="$emit('nextSlide')"
                />
            </div>
        </div>
    </q-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, inject } from 'vue';
import { cloneDeep } from 'lodash';
import { useFileStore } from 'stores/file-store';
import { selectedDataSymbol, ISelectedData } from 'src/types/index';

const props = defineProps({
    slide: {
        type: Object,
        required: true
    },
    disable: {
        type: Boolean,
        default: false
    },
    buttonsToNavigate: {
        type: Boolean,
        default: false
    },
    buttons: {
        type: Object,
        default: () => {
            return {
                hasBackButton: false,
                hasNextButton: false
            }
        }
    }
});

const data = inject(selectedDataSymbol) as ISelectedData;
const articleHeight = inject('articleHeight', null) as number | null;
const currentSlideId = inject('currentSlideId') as string;
const currentSlide = inject('currentSlide') as object | null;

const elementsCopy = ref(cloneDeep(props.slide));
const divRef = ref<Element | null>(null);

onBeforeMount(() => {
    elementsCopy.value = cloneDeep(props.slide);
    if(currentSlideId){
        currentSlideId.value = elementsCopy.value[0].id;
    }
});

onMounted(() => {
    if (divRef.value && articleHeight) {
        articleHeight.value = divRef.value.offsetHeight;
    }
});

watch(elementsCopy, (newValue, oldValue) => {
    data.updateElementInSelectedData({id: props.slide[0].id, button: elementsCopy.value[0].selected});
    data.controlGroupInSelectedData(props.slide[0].id, ['button']);
    useFileStore().update(props.slide[0].id, elementsCopy.value);
}, { deep: true });

watch(currentSlideId, (newId) => {
    if (props.slide[0].id === newId) {
        setTimeout(() => {
            if (divRef.value) {
                articleHeight.value = divRef.value.offsetHeight;
            }
        }, 10);
    }
});

const checkPermission = (id: string, emitEvent: boolean) => {
    return data.checkPermission(id, emitEvent);
};
</script>

<style scoped>
.card-styled {
    height: auto;
}
.synopsys {
    max-height: 185px;
    overflow: auto;
    margin: 0 !important;
}
</style>
