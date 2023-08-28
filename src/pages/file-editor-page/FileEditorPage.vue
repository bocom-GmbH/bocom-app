<template>
    <div>
        {{ id }} asd {{ magazine?.label  }}
    </div>
</template>

<script lang="ts">
import ArticleSelector from 'src/components/configurator/ArticleSelector.vue';
import { defineComponent, ref } from 'vue';
import { useFileStore } from 'stores/file-store';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'FileEditorPage',
    props: {
		id: {
			type: String,
			required: false
		}
    },
    setup () {
        const route = useRoute();
		    const fileStore = useFileStore();
        const magazine = ref(fileStore.getFileDataById(route.params.id))
        console.log(magazine.value.label)
        return {
            magazine
        }
    }
})


</script>
