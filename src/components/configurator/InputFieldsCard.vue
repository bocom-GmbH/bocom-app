<template>
    <div class="q-ma-sm flex items-center">
        <span class="text-weight-bold article-heading">Preis angeben</span>
        <q-space/>
        <q-circular-progress
          show-value
          class="text-accent q-ma-md"
          :value="progress"
          size="32px"
          color="primary"
      />
        <q-card class="q-ma-sm q-pa-md bg-primary flex card">
           <div class="first-column flex">
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Rounded outlined" />
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Input" />
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Input" />
           </div>
           <div class="second-column flex">
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Input" />
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Input" />
                <q-input rounded outlined :bg-color="text ? 'green' : 'blue'" v-model="text" label="Input" />
           </div>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'InputFieldsCard',
    setup () {
        return {
            text: ref('Placeholder'),
            progress: ref(55)
        }
    }
})
</script>

<style scoped>
.article-heading {
  font-size: 22px;
}
.first-column {
    width: 70%;
    gap: 15px;
}
.second-column {
    width: 30%;
    gap: 15px;
}
.card {
    border-radius: 12px;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
