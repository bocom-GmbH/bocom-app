<template>
    <div class="seite-titel"> {{ components?.label }} </div>
    <div v-if="components?.data">
        <div v-for="(component) of components.data.filter(file => file.label)" :key="component.data[0].elementId">
            <main-configurator
                v-if="components && componentHub.getRequireMainConfigurator(component.data[0].elementId)"
                :label="component.label"
                :numberToSelect="component.data[0].numberToSelect"
            >
                <template v-slot:body>
                    <div v-if="component">
                        <component
                            v-if="components && component"
                            :element="component.data"
                            :is="componentHub.getComponentById(component.data[0].elementId)"
                            :numberToSelect="component.data[0].numberToSelect"
                        />
                    </div>
                </template>
            </main-configurator>
            <component
                v-if="components && !componentHub.getRequireMainConfigurator(component.data[0].elementId)"
                :element="component"
                :is="componentHub.getComponentById(component.data[0].elementId)"
                :numberToSelect="component.data[0].numberToSelect"
            />
        </div>
    </div>
    <div v-else class="q-pa-md flex flex-center">
        <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'

import MainConfigurator from 'src/components/MainConfigurator.vue';
import { useQuery } from '@vue/apollo-composable'
import { getSiteById } from 'src/apollo/queries/files'
import { useFileStore } from 'stores/file-store'
import { useComponentStore } from 'stores/component-hub-store'

export default defineComponent({
    name: 'SingleSitePage',
    props: {
        siteId: {
            type: String,
            required: true
        }
    },
    components: {
        MainConfigurator
    },
    setup (props) {
        const componentHub = useComponentStore()
        const fileStore = useFileStore()
        const components = ref<any[]>([])

        //querying the site data by the active site id
        onMounted(() => {
            querySiteData(props.siteId)
            //get the components from the pinia store
            components.value = fileStore.getCurrentSiteComponents()
        })

        //reset the current site before the next page opens
        onUnmounted(() => {
            fileStore.currentSite = []
        })

        //if the siteId changes the site data should be queried again
        //and scroll to the top
        watch(() => props.siteId, () => {
            querySiteData(props.siteId)
            scrollToTop()
        })

        //if the template changes the components should be updated
        watch(() => fileStore.getCurrentSiteComponents(), () => {
            components.value = fileStore.getCurrentSiteComponents()
        }, { deep: true })

        //it will scroll to the top
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        }

        const querySiteData = (siteById: string) => {
            try {
                const { onResult } = useQuery(
                    getSiteById, () => ({
                        templateId: siteById
                    }),
                    () => ({
                        errorPolicy: 'all',
                        fetchPolicy: 'no-cache'
                    })
                )
                onResult((result) => {
                    fileStore.currentSite = []
                    fileStore.setCurrentSite(result?.data?.Seite)
                })
            } catch ( error) {
                console.log(error)
            }
        }
        return {
            components,
            componentHub
        }
    }
})

</script>
 <style scoped>
.seite-titel {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 0px;
    font-size: 1.5rem;

}

</style>
