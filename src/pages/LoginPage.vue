<template>
	<q-page class="flex flex-center">
		<div class="flex flex-center">
			<q-img class="q-mb-lg" width="270px" src="../img/bocom_logo_mit_Claim_darunter_Marketing_für_Apotheken_tme.png" />
			<div class="flex flex-center" style="width: 70%">
				<q-input class="q-mb-lg" outlined v-model="username" label="Username" style="width: 100%;"/>
				<q-input class="q-mb-lg" outlined v-model="password" label="Password" type="password" style="width: 100%"/>
				<q-btn style="width:100%" class="bg-primary text-white" no-caps label="Anmelden" @click="loginFunc"/>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
	name: 'LoginPage',
	data () {
		return {
			username: '',
			password: ''
		}
	},
	setup () {
		let { mutate: login, error: loginError, loading: loading } = useMutation( 
			gql`
				mutation Login (
					$username: String!,
					$password: String!
				) {
					login (
						username: $username,
						password: $password
					) {
						token
					}
				}
			`
		)

		return {
			login
		}
	},
	methods:{
		async loginFunc(){
			const loginData = await this.login({ username: this.username, password: this.password })
			console.log(loginData)
		}
	}
})
</script>
