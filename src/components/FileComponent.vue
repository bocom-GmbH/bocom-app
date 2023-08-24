<template>
    <q-card class="bg-primary q-ma-xl">
        <h6> {{ fileData?.value?.queryFileData?.label }}</h6>
        <q-card-section>
            <div>
                {{ fileData?.value?.queryFileData?.data[0].data.text }}
            </div>
        </q-card-section>
        <q-card-section>
            <div>
                {{ fileData?.value?.queryFileData?.data[1].data.text }}
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRaw } from 'vue';
import { queryFileData } from 'src/apollo/queries/files';
import { useQuery } from '@vue/apollo-composable';

    export default defineComponent({
        name: 'FileComponent',
        props:{
            id: {
                type: String,
                required: true
            }
        },
        setup(props){
            const fileData = ref<any>({});

            const getFileData = (id: string) => {
                try {
                    const { result } = useQuery(
                        queryFileData, () => ({
                            queryFileDataId: id
                        }),
                        () => ({
                            errorPolicy: 'all',
                        })
                    )
                    console.log(result, 'result')
                    return result
                } catch ( error) {
                    console.log(error)
                }
        }

        onMounted(() => {
              console.log('etwas')
              fileData.value = getFileData(props.id)
        })

            return {
                fileData
            }
        }




    })

</script>
