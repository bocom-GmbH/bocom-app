<template>
  <div class="q-ma-sm">
      <span class="text-weight-bold article-heading">Artikel auswahlen</span>
      <q-carousel
          animated
          v-model="slide"
          navigation
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          class="carousel-styled bg-primary q-pa-md q-ma-sm"
          ref="carousel"
      >
      <q-carousel-slide class="q-pa-none" :name="1">
          <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
              <span class="card-title">Artikel titel</span>
              <div>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.
              </div>
              <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
          </q-card>
      </q-carousel-slide>
      <q-carousel-slide class="q-pa-none" :name="2">
          <q-card flat class="card-styled q-pa-md q-pa-none text-center bg-primary">
              <span class="card-title">Artikel titel 2</span>
              <div>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.
              </div>
              <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
          </q-card>
      </q-carousel-slide>
          <template v-slot:control>
              <q-carousel-control
                  position="bottom-left"
                  :offset="[18, 18]"
                  class="q-gutter-xs"
              >
              <q-btn
                  round dense color="white" text-color="black" icon="chevron_left"
                  @click="$refs.carousel.previous()"
              />
              </q-carousel-control>
              <q-carousel-control
                  position="bottom-right"
                  :offset="[18, 18]"
                  class="q-gutter-xs"
              >
              <q-btn
                  round dense color="white" text-color="black" icon="chevron_right"
                  @click="$refs.carousel.next()"
              />
              </q-carousel-control>
          </template>
      </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ArticleSelector',
  setup() {
      return {
          slide: ref(1),
          shape: ref(['line'])
      }
  }
})
</script>

<style scoped>
@import '../../css/configurator/article-selector.scss';
</style>
