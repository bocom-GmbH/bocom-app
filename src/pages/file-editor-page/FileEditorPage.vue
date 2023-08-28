<template>
    <div>
      <h6>Seite {{ currentSite }}</h6>
      <ComponentRouter
          :id="id"
          :componentData="magazine?.Templates.find( template => template.label === 'Seite' + ' ' + currentSite)"
      />
        <q-pagination
            v-model="currentSite"
            :max="sites.value"
            direction-links
        />
    </div>
</template>

<script lang="ts">
//import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import { defineComponent, ref, watch } from 'vue';
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



        watch(getFileData, () => {
            magazine.value = fileStore.getFileDataById(route.params.id)
            sites.value = ref(magazine.value?.Templates?.length)
            console.log(magazine.value?.Templates?.length, "magazine")
        })

        console.log(sites.value, "sites")

        return {
            magazine,
            sites,
            currentSite
        }
    }
})


</script>
