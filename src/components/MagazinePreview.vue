<template>
     <div class="magazine-card flex no-wrap items-center">
        <!-- <q-circular-progress
            show-value
            class="text-secondary q-ma-md"
            value="55"
            size="57px"
            color="bocom-lila"
        /> -->
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

       <!--  <q-card class="card-styled full-width bg-primary q-pa-xs q-pr-xl q-ma-none flex relative">
            <span class="text-bold magazine-label"> {{ label }} </span>
            <q-icon class="icon-styled" color="white" size="24px" name="arrow_forward_ios"></q-icon>
        </q-card> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useFileStore } from 'stores/file-store';
import { IFileData } from 'src/types/index';

export default defineComponent({
    name: 'MagazineItem',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props){
        const fileStore = useFileStore();
        //converting the prop id to a ref to be reactive
        const { id } = toRefs(props)

        //getting the current magazine data from the store
        const magazineLabel = fileStore.getFileDataById(id.value) as IFileData

        return {
            //return the magazine label
            label: magazineLabel?.label
        }
    }


})
</script>

<style scoped>

.magazine-card{
    width: 100% !important;
}

.q-list--bordered{
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
    color: black
}

.icon-styled {
	position: absolute;
	right: 10px;
	top: 18px;
}
</style>
