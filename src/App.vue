<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApolloClient } from 'src/apollo/utils';

export default defineComponent({
    name: 'App',
    setup() {
        useApolloClient();
    },
});
</script>
