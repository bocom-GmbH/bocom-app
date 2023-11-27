<template>
    <q-footer bordered class="footer bg-primary text-primary q-pb-md">
        <q-tabs
            no-caps
            active-color="secondary"
            switch-indicator
            indicator-color="secondary"
            class="text-grey-8 footer-tabs"
            v-model="activeTab"
        >
            <q-route-tab
                v-for="tab in bottomMenuList"
                :key="tab.navigateToPath"
                :name= tab.name
                :to="tab.navigateToPath"
                :icon="tab.icon"
            >
                <div class="text-black"> {{ tab.label }}</div>
            </q-route-tab>
        </q-tabs>
    </q-footer>
</template>

<script lang="ts">

import { defineComponent, ref, PropType, watch } from 'vue'

//import stores
import { useTabStore } from 'src/stores/navigation-store'

//import interfaces
import { BottomMenuItem } from './../types/index'


export default defineComponent({
    name: 'BottomMenu',
    props:{
        bottomMenuList:{
            type: Array as PropType<BottomMenuItem[]>,
            required: true
        }
    },
        setup(){
        const tabStore = useTabStore();
        const activeTab = ref(tabStore.getActiveTab)

        watch(() => activeTab.value, () => {
            tabStore.setActiveTab(activeTab.value)
        })

        return {
            activeTab,
            tabStore,
        }
    }
})
</script>

<style>

/* .svg-icon{
  stroke-width: 10px;
} */

</style>
