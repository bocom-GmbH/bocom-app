<template>
	<q-page>
    <!-- <InputFieldsCard/>
    <ArticleSelector/>
    <ProductSelector/> -->
    <router-link :to="{ path: `/FileEditorPage/${magazine.data?.Magazin[0]?.id}` }">
        <MagazinePreview
            :magazine="magazine"
        />
    </router-link>
    <!-- <ImageSelector/> -->
	<!-- 	<file-component
			v-for="file in files"
			:id="file"
			:key="file"
		/>
		<q-btn
			class="q-ma-lg"
			v-for="button in buttons"
			:key="button.permissionId"
			:disable="!button.disable"
		>
			{{ button.label }}
		</q-btn> -->

		<!-- <q-btn label="logout" class="bg-primary text-white q-ma-lg" style="width: 70%;" @click="logout" />
 -->
	</q-page>
</template>

<script lang="ts">


import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication';
import { useFileStore } from 'stores/file-store';

import { Cookies } from 'quasar'
import MagazinePreview from 'src/components/MagazinePreview.vue'
//import ImageSelector from 'src/components/configurator/ImageSelector.vue'
//import ArticleSelector from 'src/components/configurator/ArticleSelector.vue'
//import ProductSelector from 'src/components/configurator/ProductSelector.vue'
//import FileComponent from 'src/components/FileComponent.vue'
//import InputFieldsCard from 'src/components/configurator/InputFieldsCard.vue';

import { useQuery } from '@vue/apollo-composable'
import { getMagazine } from '../apollo/queries/files'




export default defineComponent({
	name: 'HomePage',
	components: {
		//FileComponent,
		MagazinePreview,
		/* ImageSelector, */
		/* ArticleSelector,
		ProductSelector,
		InputFieldsCard */
	},
	setup () {

        const router = useRouter();
        const store = useUserStore();
        const fileStore = useFileStore();
        const magazine = ref({})

        const queryFileData = () => {
            try {
                const { onResult } = useQuery(
                    getMagazine, () => ({

                    }),
                    () => ({
                        errorPolicy: 'all',
                    })
                )
                onResult((result) => {
                    magazine.value = result
                    fileStore.setFileData(result.data.Magazin)
                })
            } catch ( error) {
                console.log(error)
            }
        }



        onMounted( () => {
            queryFileData()
        })


        const logout = () => {
            Cookies.remove('apollo-token')
            store.resetUserAuthentication();
            window.localStorage.removeItem('permissions');
            router.push('/login')
            store.$reset();
        }



        return {
            logout,
            magazine
        };
    },

});
</script>
