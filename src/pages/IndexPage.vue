<template>
	<q-page class="">
		
		<!-- <div v-for="button in buttons" :key="button.permissionId">
			<q-btn :label="button.label" class="bg-primary text-white" style="width: 70%;"/>
			{{ button.disable }}
		</div> -->
		<q-btn label="test permission" @click="test2('117b37b6-cda0-4790-b472-29e5a697ed0e')"/>
		{{ temp }}
		<q-btn label="logout" class="bg-primary text-white" style="width: 70%;" @click="logout" />
		
	</q-page>
</template>

<script lang="ts">


import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication'; 
import { Cookies } from 'quasar'
import { queryFileData } from 'src/apollo/queries/files';
import { checkPermission } from 'src/apollo/queries/user';
import { useQuery } from '@vue/apollo-composable';




export default defineComponent({
	name: 'IndexPage',
	
	setup () {
		let temp = ref()
		const router = useRouter();
		const store = useUserStore();
		
		const tempValue = ref<any>()

		const files = [
			'07ad890b-82ee-4bc9-ab6a-ebd0dc6b954d',
			'117b37b6-cda0-4790-b472-29e5a697ed0e',
			'1af29a13-4e49-4542-b977-2aee429d077a'
		]

		const testPermission = (queryFileDataId: string) => {
			try {
				const { result } = useQuery(
					queryFileData, () => ({
						queryFileDataId: queryFileDataId
					}),
					() => ({
						errorPolicy: 'all',
					})
				
				)
				return result
			} catch ( error) {
				console.log(error)
			}
			
		}

		onMounted(() => {
			temp.value = testPermission('07ad890b-82ee-4bc9-ab6a-ebd0dc6b954d')
		})
		

		/* const buttons = ref([
				{
					label: 'Test',
					permissionId: '94ab3b81-b1dd-4d6f-a220-49cbe887ad24',
					disable: testPermission('94ab3b81-b1dd-4d6f-a220-49cbe887ad24'),
				},
				{
					label: 'Test2',
					permissionId: '602e03c4-0538-46d0-811f-8fb9d9d19441',
					disable: testPermission('602e03c4-0538-46d0-811f-8fb9d9d19441'),
				},
				{
					label: 'Test3',
					permissionId: 'f392cb3d-93d3-4c45-8d9f-78a725f0f451',
					disable: testPermission('f392cb3d-93d3-4c45-8d9f-78a725f0f451'),
				}
			]
		) */



		const logout = () => {
			Cookies.remove('apollo-token')
			store.resetUserAuthentication();
			window.localStorage.removeItem('permissions');
			router.push('/login')
			store.$reset();
		}


		return {
			logout,
			testPermission,
			temp
		};
	},
	methods: {
		test2(id: string){
			this.temp.value = this.testPermission(id)
			console.log(this.temp)
		}
	}
});
</script>
