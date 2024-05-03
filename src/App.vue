<template>
    <router-view />
</template>

<script lang="ts" setup>

import { useApolloClient } from 'src/apollo/utils';

useApolloClient();

</script>
