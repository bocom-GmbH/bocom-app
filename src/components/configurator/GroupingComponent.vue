<template>
    <div class="q-ma-sm">
        <span class="text-weight-bold article-heading"> asds </span>
        <q-carousel
            animated
            v-model="slide"
            navigation
            transition-prev="slide-right"
            transition-next="slide-left"
            class="carousel-styled bg-primary q-pa-md q-ma-sm"
            ref="carousel"
        >
            <q-carousel-slide name="index">
                {{ element }}
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'GroupingComponent',
    props: {
        element: {
            type: Object,
            required: true
        },
        children: {
            type: Array,
            required: true
        }
    },
    setup(props){
        onMounted(() => {
            console.log(props.element)
        })
    }
})
</script>
