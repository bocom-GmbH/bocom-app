<template>
	<q-page class="row items-center justify-evenly">
		<div v-for="button in buttons" :key="button.permissionId">
			<q-btn :label="button.label" class="bg-primary text-white" style="width: 30%;" v-show="button.disable"/>
		</div>
		<q-btn label="test permission" @click="test" />
		<q-btn label="logout" class="bg-primary text-white" style="width: 70%;" @click="logout" />
	</q-page>
</template>

<script lang="ts">


import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication'; 
import { Cookies } from 'quasar'
import { checkPermission } from 'src/apollo/queries/user'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core';


export default defineComponent({
	name: 'IndexPage',
	
	setup () {
		const router = useRouter();
		const store = useUserStore();

		const checkPermissionHere = (permissionId: string) => {
			const { onResult, error, loading } = useQuery(checkPermission, { permissionId: permissionId });
			onResult((result) => {
				console.log(result, error.value, loading.value);
			});
		};

		const testFiles = async () => {
			const { result } = await useQuery(gql`
				query Files {
					files {
						data
						id
						label
						nodedata
						schemaId
					}
				}
			`);
			console.log(result);
		}

		

		const buttons =  ref([
			{
				label: 'Test',
				permissionId: '94ab3b81-b1dd-4d6f-a220-49cbe887ad24',
				disable: checkPermissionHere('94ab3b81-b1dd-4d6f-a220-49cbe887ad24')
			},
			{
				label: 'Test2',
				permissionId: '602e03c4-0538-46d0-811f-8fb9d9d19441',
				disable: checkPermissionHere('602e03c4-0538-46d0-811f-8fb9d9d19441')
			},
			{
				label: 'Test3',
				permissionId: 'f392cb3d-93d3-4c45-8d9f-78a725f0f451',
				disable: checkPermissionHere('f392cb3d-93d3-4c45-8d9f-78a725f0f451')
			}
		])

		const test = async () => {
			testFiles();
			//console.log(await checkPermissionHere('94ab3b81-b1dd-4d6f-a220-49cbe887ad24'))
		}

		const logout = () => {
			Cookies.remove('apollo-token')
			store.resetUserAuthentication();
			router.push('/login')
		}


		const isLoggedIn = computed(() => {
			return store.getUserId != null && store.getUserId != ''
		});

		return {
			logout,
			buttons,
			checkPermissionHere,
			test
		};
	}
});
</script>
