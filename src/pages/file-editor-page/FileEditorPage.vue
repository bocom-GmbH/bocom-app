<template>
    <div>
        <h6 class="seite-titel">Seite {{ currentSite }}</h6>
        <ComponentRouter
            v-if="magazine?.Templates"
            :id="id"
            :componentData="magazine?.Templates?.find( template => template?.label === 'Seite' + ' ' + currentSite)"
        />
        <div class="pagination">
            <q-pagination
                class="q-ma-none"
                v-model="currentSite"
                :max="sites.value"
                direction-links
            />
        </div>
    </div>
</template>

<script lang="ts">
//import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useFileStore } from 'stores/file-store';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import ComponentRouter from 'src/components/ComponentRouter.vue';



export default defineComponent({
    name: 'FileEditorPage',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        ComponentRouter
    },
    setup () {
        const route = useRoute();
        const fileStore = useFileStore();
        const magazine = ref()
        const { getFileData } = storeToRefs(fileStore)

        const sites = ref(0)
        const currentSite = ref(1)

        onMounted(() => {
            magazine.value = fileStore.getFileDataById(route.params.id)
            sites.value = ref(magazine.value?.Templates?.length)
        })

        watch(getFileData, () => {
            magazine.value = fileStore.getFileDataById(route.params.id)
            sites.value = ref(magazine.value?.Templates?.length)
        })

        return {
            magazine,
            sites,
            currentSite
        }
    }
})


</script>

<style>
.seite-titel{
    width: 100%;
    text-align: center;
}
.pagination {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
</style>
