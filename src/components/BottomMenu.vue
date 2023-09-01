<template>
    <q-footer bordered class="footer bg-primary text-primary q-pb-md">
        <q-tabs
            no-caps
            active-color="secondary"
            switch-indicator
            indicator-color="accent"
            class="text-grey-8 footer-tabs"
            v-model="activeTab"


        >
            <q-route-tab
                v-for="tab in bottomMenuList"
                :key="tab.navigateToPath"
                :name= tab.label
                :to="tab.navigateToPath"
            >
               <!--  <q-badge class="q-mt-xs q-pt-xs" v-if="tab.notification" color="red" floating>{{ tab.notification }}</q-badge> -->
                <q-img height="24px" width="24px" :src="getIcon(tab.icon)"></q-img>
                <div class="text-black"> {{ tab.label }}</div>
            </q-route-tab>
        </q-tabs>
    </q-footer>
</template>

<script lang="ts">

import { defineComponent, ref, PropType } from 'vue'

//import stores
//import { useTabStore } from 'src/stores/navigation-store'

//import icons
import MenuIcon from 'src/img/icons/MenuIcon.png'
import ShopIcon from 'src/img/icons/ShopIcon.png'
import Home_light from 'src/img/icons/Home_light.svg'
import Bell from 'src/img/icons/Bell.svg'

//import interfaces
import { BottomMenuItem } from './models'

export default defineComponent({
    name: 'BottomMenu',
    props:{
        bottomMenuList:{
            type: Array as PropType<BottomMenuItem[]>,
            required: true
        }
    },
        setup(){
        //const tabStore = useTabStore();


        const icons = ref<{ [key: string]: string }>({
            MenuIcon,
            ShopIcon,
            Home_light,
            Bell
        })

        const getIcon = (iconName: string) :string => {
            return icons.value[iconName]
        }

        const activeTab = ref('Menu')


        return {
            activeTab,
            //tabStore,
            getIcon
        }
    }
})
</script>

<style>

/* .svg-icon{
  stroke-width: 10px;
} */

</style>
