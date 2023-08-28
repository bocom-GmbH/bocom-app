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
            <span class="text-bold"> {{ magazine.data?.Magazin[0]?.label }} </span>
            <q-icon class="icon-styled" color="white" size="24px" name="arrow_forward_ios"></q-icon>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
	name: 'MagazineItem',
	props: {
		magazine: {
			type: Object,
			required: true
		},
    id: {
      type: String,
      required: false
    }
	}

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
