<template>
    <div class="q-pa-xs">
        <span class="text-weight-bold product-title">{{ element.label }}</span>
        <div class="wrapper q-pl-sm">
            <q-card
                class="custom-card bg-primary q-my-md flex"
                    v-for="(slide, index) in data?.data?.TitelbildById.Bilder"
                    :key="index"
                >
                <q-img class="custom-img" :src="`https://images.bocom.at/${slide}`"></q-img>

                <div class="flex-column q-pa-sm no-wrap">
                    <div class="custom-text q-mb-none text-weight-bold text-left">Kamillen Complex Kapseln</div>
                </div>

                <q-toggle class="q-mt-xs" color="positive" v-model="shape" size="70px"/>

            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getTitelBildById } from '../../apollo/queries/files'

export default defineComponent({
    props:{
        element:{
            type: Object,
            required: true
        }
    },
    setup(props){
        const data = ref()
        const getImages = ( id:string ) => {
            try {
                const { onResult } = useQuery(
                    getTitelBildById, () => ({
                        fileId: id
                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {
                    data.value = result
                })
            }
            catch (error) {
                console.log(error)
            }
        }


        onMounted(() => {
            getImages(props?.element?.fileIds[0])
        })

        return {
            shape: ref(false),
            data
        }
    }
})


</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: auto;
    scroll-behavior: smooth;
}

.product-title {
    font-size: 22px;
}
.no-wrap {
  width: 100%;
  word-break: break-all;
}
.row.inline, .column.inline, .flex.inline {
  display: inline-flex;
  justify-content: center;
}
.custom-card {
  border-radius: 12px;
  min-width: 200px !important;
}
.custom-img {
  height: 270px;
}
.custom-text {
  font-size: large;
}


</style>
