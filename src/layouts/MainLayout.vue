<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
			Quasar App
        </q-toolbar-title>
		<q-btn label="login" @click="loginFunc" />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
		<router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag'

export default defineComponent({
	name: 'MainLayout',

	data () {
		return {
			username: 'test1',
			password: 'test1'
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
		}
	}
});
</script>
