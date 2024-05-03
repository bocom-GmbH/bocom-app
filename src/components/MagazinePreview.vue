<template>
    <div class="magazine-card flex no-wrap items-center">
       <q-list style="width: 100%" bordered class="rounded-borders">
           <q-expansion-item
               class="q-expansion-item shadow-1 overflow-hidden"
               style="border-radius: 12px; width: 100%"
               icon="earth"
               :label="label"
               header-class="bg-primary text-white"
               expand-icon-class="text-white"
           >
               <q-card class="q-mr-md">
                   <q-card-section>
                       Project details <br>
                       Abgabe Termin: <br>
                       Abgabe Frist:
                   </q-card-section>
                   <q-btn
                       class="q-ma-md"
                       style="width: 95%"
                       color="primary"
                       label="Open"
                       :to="{ path: `/HomePage/FileEditorPage/${id}` }"
                   />
               </q-card>
           </q-expansion-item>
       </q-list>
   </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useFileStore } from 'stores/file-store';
import type { IFileData } from 'src/types/index';

const props = defineProps({
   id: {
       type: String,
       required: true
   }
});

const { id } = toRefs(props); // To ensure reactivity of the id prop

const fileStore = useFileStore();

const fileData = fileStore.getFileDataById(id.value) as IFileData;
const label = fileData?.label;
</script>

<style scoped>
.magazine-card {
   width: 100% !important;
}

.q-list--bordered {
   border: none !important;
}

.card-styled {
   height: 57px;
   border-radius: 12px;
   display: flex;
   align-items: center;
}

.magazine-label {
   font-size: 16px;
   font-weight: 500;
   margin-left: 10px;
   color: black;
}

.icon-styled {
   position: absolute;
   right: 10px;
   top: 18px;
}
</style>
