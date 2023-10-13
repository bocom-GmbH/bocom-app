<template>
     <div class="flex no-wrap items-center">
        <q-circular-progress
            show-value
            class="text-secondary  q-ma-md"
            value="55"
            size="57px"
            color="bocom-lila"
        />
        <q-card class="card-styled full-width bg-primary q-pa-xs q-pr-xl q-ma-none flex relative">
            <span class="text-bold magazine-label"> {{ label }} </span>
            <q-icon class="icon-styled" color="white" size="24px" name="arrow_forward_ios"></q-icon>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useFileStore } from 'stores/file-store';


export default defineComponent({
    name: 'MagazineItem',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props){
        const fileStore = useFileStore();

        const { id } = toRefs(props)

        const magazineLabel = fileStore.getFileDataById(id.value)

        return {
            label: magazineLabel.label
        }
    }


})
</script>

<style scoped>
.card-styled {
	height: 57px;
	border-radius: 12px;
    display: flex;
    align-items: center;
}
.magazine-label {
    font-size: 16px;
    font-weight: 500;
    margin-left: 10px;
    color: black
}

.icon-styled {
	position: absolute;
	right: 10px;
	top: 18px;
}
</style>
