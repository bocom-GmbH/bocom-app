<template>
    <q-card class="custom-card bg-primary q-my-md flex">
        <q-img class="custom-img" src="https://cdn.quasar.dev/img/parallax1.jpg"></q-img>

        <div class="flex-column q-pa-sm no-wrap">
          <div class="custom-text q-mb-none text-weight-bold text-left">Kamillen Complex Kapseln</div>
        </div>

        <q-toggle class="q-mt-xs" color="positive" v-model="shape" size="70px"/>

    </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { getMitarbeiter as getMItarbeiterData } from '../../apollo/queries/files'

export default defineComponent({
    name: 'MitartbeiterCard',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup() {
        const data = ref({})
        const getMitarbeiter = () => {
            try {
                const { onResult } = useQuery(
                    getMItarbeiterData, () => ({

                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {

                    data.value = result
                })
            } catch (error) {
                console.log(error)
            }
        }

        onMounted(() => {
            getMitarbeiter()
        })


        return {
            shape: ref(false),

        }

    }

})
</script>

<style scoped>
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
  height: 170px;
}
.custom-text {
  font-size: large;
}

/* Import is not working here */
/* @import '../../css/configurator/article-selector.scss'; */
</style>
