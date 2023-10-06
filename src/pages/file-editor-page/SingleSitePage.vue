<template>
    <h6 class="seite-titel"> {{ components?.label }} </h6>

    <div v-if="components?.data">
        <div v-for="(component) of components.data.filter(file => file.label)" :key="component.elementId">
            <main-configurator
                v-if="components"
                :label="component.label"
                :numberToSelect="component.data[0].numberToSelect"
            >
                <template v-slot:body>
                    <div v-if="component">
                        <component
                            v-if="components && component"
                            :element="component.data"
                            :is="componentHub.getComponentById(component.data[0].elementId)"
                        />
                    </div>
                </template>
            </main-configurator>
            <div v-else class="q-pa-md flex flex-center">
                <q-circular-progress
                    indeterminate
                    rounded
                    size="50px"
                    color="primary"
                    class="q-ma-md"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

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

        onMounted(() => {
            querySiteData(props.siteId)
        })

        watch(() => props.siteId, () => {
            querySiteData(props.siteId)
        })

        watch(() => fileStore.getCurrentSiteComponents(), () => {
            components.value = fileStore.getCurrentSiteComponents()
        })


        const querySiteData = (siteById: string) => {
            try {
                const { onResult } = useQuery(
                    getSiteById, () => ({
                        templateId: siteById
                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {
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
