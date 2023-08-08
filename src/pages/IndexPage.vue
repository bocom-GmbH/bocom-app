<template>
	<q-page class="row items-center justify-evenly">
		<div v-for="button in buttons" :key="button.permissionId">
			<q-btn :label="button.label" class="bg-primary text-white" style="width: 30%;" v-if="button.disable"/>
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
import { setContext } from "@apollo/client/link/context";

export default defineComponent({
	name: 'IndexPage',
	
	setup () {
		const router = useRouter();
		const store = useUserStore();

		const checkPermissionHere = async (permissionId: string): Promise<boolean> => {
			const { result, error, loading } = await useQuery(checkPermission, { permissionId: permissionId }, {
				fetchPolicy: 'no-cache',
					context: setContext((_, { headers }) => {
						const token = Cookies.get('apollo-token');
						return {
							headers: {
								...headers,
								authorization: token ? `Bearer ${token}` : '',
							},
						};
					}),
				});
			console.log(result.value, error.value, loading.value);
			return result.value == true;
		};

		const buttons = ref([
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

		const test = () => {
			console.log(checkPermissionHere('94ab3b81-b1dd-4d6f-a220-49cbe887ad24'))
			
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
