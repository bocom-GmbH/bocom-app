<template>
    <div class="q-pa-md">
        <span class="text-weight-bold title-text">Titelbild auswahlen</span>
        <q-carousel
            animated
            v-model="slide"
            navigation
            ref="carousel"
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styling bg-primary"
        >
            <q-carousel-slide :name="1">
                <q-card class="carousel-card">
                    <q-img class="carousel-image" fit="fill" src="https://cdn.quasar.dev/img/parallax1.jpg"></q-img>
                </q-card>
                <div class="toggle-wrapper">
                    <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
                </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2">
                <q-card class="carousel-card">
                    <q-img class="carousel-image" fit="fill" src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
                </q-card>
                <div class="toggle-wrapper">
                    <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
                </div>
            </q-carousel-slide>
            <q-carousel-slide :name="3">
                <q-card class="carousel-card">
                    <q-img class="carousel-image" fit="fill" src="https://cdn.quasar.dev/img/quasar.jpg"></q-img>
                </q-card>
                <div class="toggle-wrapper">
                    <q-toggle class="q-mt-xs" color="positive" size="70px" v-model="shape" val="xl" label="" />
                </div>
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ImageSelector',
  setup() {
    return {
      slide: ref(1),
      shape: ref(['line'])
    }
  }
})
</script>

<style scoped>
.title-text {
  font-size: 22px;
}

.carousel-styling {
  height: 650px;
  border-radius: 12px;
}

.carousel-card {
  height: 500px;
  border-radius: 12px;
}

.carousel-image {
  height: 500px;
}

.toggle-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
