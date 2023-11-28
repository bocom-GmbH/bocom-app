<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApolloClient } from 'src/apollo/utils';

export default defineComponent({
    name: 'App',
    setup() {
        // run the apollo client so it will be available in the entire app
        useApolloClient();
    },
});
</script>
