<template>
    <q-list style="width: 100%; border:none" bordered class="rounded-borders">
        <q-expansion-item
            class="q-expansion-item shadow-1 overflow-hidden"
            style="border-radius: 8px; width: 100%;"

            :label=" props.file.number + '-' + props.file.year + '-' + props.file.name"
            header-class="bg-primary text-secondary"
            expand-icon-class="text-secondary"
        >
            <q-card class="q-mr-md">
                <q-card-section>
                    Projekt Details <br>
                    <div class="flex justify-between">
                        <div>
                            Projekt Nummer:
                        </div>
                        <div>
                            {{ props.file.number }}
                        </div>
                    </div>
                    <div  class="flex justify-between">
                        <div>
                            Startdatum:
                        </div>
                        <div>
                            {{ props.file.startdate }}
                        </div>
                    </div>
                    <div  class="flex">
                        <div>
                            Status:
                        </div>
                        <div style="width: 100%" class="q-pl-md">
                            <div class="flex justify-between" v-for="(status, index) of props.file.statelist" :key="index">
                                <div>
                                    {{ status.state }}
                                </div>
                                <div>
                                    {{ status.date }}
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-btn
                    v-if="props.file.projectData !== null"
                    class="q-ma-md"
                    style="width: 95%"
                    color="primary"
                    label="Open"
                    text-color="secondary"
                    :to="{ path: `/HomePage/FileEditorPage/${$props.file?.projectData[0]?.id}` }"
                />
            </q-card>
        </q-expansion-item>
    </q-list>
</template>

<script setup lang="ts">

const props = defineProps({
    file: {
        type: Object,
        required: true
    }
});

</script>

<style scoped>

</style>
