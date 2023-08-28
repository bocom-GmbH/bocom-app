<template>
<div>
    <component
        v-for="element in componentData.elements"
        :is="element.componentId"
        :key="element.id"
    />
    {{ componentData }}
</div>

</template>

<script>

import { defineComponent } from 'vue';
import ImageSelector from './configurator/ImageSelector.vue';

export default defineComponent({
	props: {
		id: {
			type: String,
			required: true
		},
    componentData: {
      type: Object,
      required: true
    }
	},
  components: {
    ImageSelector
  },




})
</script>
