<template>
    <!-- <div class="seite-titel"> {{ components?.label }}</div> -->
    <!-- if the data is ready to display -->
    <div v-if="components?.data">
        <!-- filter the data object to get only the components with a label -->
        <div v-for="(component, index) in components.data.filter(file => file.label)" :key="component.data[0].elementId">
            <!-- use the main configurator if the component is ready and requires it -->
            <!-- if the compomnent has no number to select it shoud be in the second level data -->
            <main-configurator
                v-if="components && componentHub.getRequireMainConfigurator(component.data[0].elementId)"
                :label="component.label"
                :numberToSelect="component.data[0].numberToSelect || component.data[1].data[0].numberToSelect"
            >
                <!-- the content goes to the body of the main configurator -->
                <template v-slot:body>
                    <div v-if="component">
                        <component
                            :key="index"
                            v-if="components && component"
                            :element="component.data"
                            :is="componentHub.getComponentById(component.data[0].elementId)"
                            :numberToSelect="component.data[0].numberToSelect || component.data[1].data[0].numberToSelect"
                        />
                    </div>
                </template>
            </main-configurator>
            <!-- use the component if it is ready and does not require the main configurator -->
            <component
                v-if="components && !componentHub.getRequireMainConfigurator(component.data[0].elementId)"
                :element="component"
                :is="componentHub.getComponentById(component.data[0].elementId)"
                :numberToSelect="component.data[0].numberToSelect"
            />
        </div>
    </div>
    <!-- if the data is not ready to display, showing the loading spinner -->
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

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

import MainConfigurator from 'src/components/MainConfigurator.vue';
import { useQuery } from '@vue/apollo-composable'
import { getSiteById } from 'src/apollo/queries/files'
import { useFileStore } from 'stores/file-store'
import { useComponentStore } from 'stores/component-hub-store'


const props = defineProps({
    siteId: {
        type: String,
        required: true
    }
})


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
        // 'getSiteById' is a gql query function.
        const { onResult } = useQuery(
            getSiteById,
            () => ({
                templateId: siteById // Parameters for the query function. 'siteById' is used as 'templateId'.
            }),
            () => ({
                errorPolicy: 'all', // Specifies error handling policy.
                fetchPolicy: 'no-cache' // Specifies the caching policy for this query.
            })
        )

        // Handles the query result.
        // The 'onResult' function is called when the query returns a result.
        onResult((result) => {
            // Clears the current site data in the 'fileStore'.
            fileStore.currentSite = []

            // Sets the current site data in 'fileStore' with the new data from the query result.
            // 'result?.data?.Seite' extracts the site data from the query result.
            fileStore.setCurrentSite(result?.data?.Seite)
        })
    } catch (error) {
        // Catches and logs any errors that occur during the query process.
        console.log(error)
    }
}


</script>
<style scoped>
.seite-titel {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 0px;
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
}

</style>
