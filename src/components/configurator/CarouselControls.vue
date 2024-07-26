<template>
  <div>
    <q-carousel-control
      v-if="currentSlide > 0"
      position="bottom-left"
      :offset="[18, 18]"
      class="q-gutter-xs"
    >
      <q-btn
        round dense color="white" text-color="black" icon="chevron_left"
        @click="previousSlide"
      />
    </q-carousel-control>
    <q-carousel-control
      v-if="currentSlide < elementLength - 2"
      position="bottom-right"
      :offset="[18, 18]"
      class="q-gutter-xs"
    >
      <q-btn
        round dense color="white" text-color="black" icon="chevron_right"
        @click="nextSlide"
      />
    </q-carousel-control>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  currentSlide: {
    type: Number,
    required: true
  },
  elementLength: {
    type: Number,
    required: true
  }
});

const carousel = ref(null);

const previousSlide = () => {
  if (carousel.value) {
    carousel.value.previous();
  }
};

const nextSlide = () => {
  if (carousel.value) {
    carousel.value.next();
  }
};
</script>