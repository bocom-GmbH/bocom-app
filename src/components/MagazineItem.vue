<template>
  <div class="flex no-wrap items-center">
      <q-circular-progress
          show-value
          class="text-accent q-ma-md"
          :value="progress"
          size="57px"
          color="bocom-lila"
      />
      <q-card class="card-styled full-width bg-primary q-pa-xs q-pr-xl q-ma-none flex relative">
          <span class="text-bold">Sommerausgabe 2023 und Limon-Chello Etikett und Limon-Chello Etikett</span>
          <q-icon class="icon-styled" color="white" size="24px" name="arrow_forward_ios"></q-icon>
      </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  name: 'MagazineItem',
  props: ({
      id: {
          type: String,
          required: true
      },
      progress: {
          type: Number,
          default: 0
      },
      label: {
          type: String,
          default: ''
      }
  })
})
</script>

<style scoped>
.card-styled {
  height: 57px;
  border-radius: 12px;
}

.icon-styled {
  position: absolute;
  right: 10px;
  top: 18px;
}
</style>
