<template>
    <q-header class="bg-accent" elevated>
        <q-toolbar>
            <!-- show the back button if it is needed -->
            <q-btn
                v-if="tabStore.isBackButtonAvailable"
                color="secondary"
                icon="arrow_back"
                class="back-button q-ma-sm absolute"
                @click="goBack"
                flat
                dense
            />

        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTabStore } from 'src/stores/navigation-store'
export default defineComponent({
    name: 'AppHeader',
    setup(){
        const tabStore = useTabStore();
        //function that handle the history of the browser
        const goBack = () => {
			history.back();
		};

        return {
            tabStore,
            goBack
        }
    }
})
</script>
