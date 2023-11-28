<template>
	<q-page padding>
        <h6> {{ store.getUserId }}</h6>
        <h6> {{ store.getUserName }}</h6>

        <div style="width:100%; display: grid; place-items: center;" class="absolute-bottom">
            <q-btn label="logout" class="bg-secondary text-white q-ma-lg" style="width: 70%;" @click="logout" />
        </div>

	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/authentication';
import { Cookies } from 'quasar'

export default defineComponent({
	name: 'ActivityPage',
	components: {
	},
	setup () {

		const router = useRouter();
		const store = useUserStore();

        //the log out function deletes the token, permission ids and the cookies from the pinia store and from the local storage
        //then redirect to the login page
        const logout = () => {
            //remove apollo token from cookies
            Cookies.remove('apollo-token')
            //store function to reset the userData and permissions
            store.resetUserAuthentication();
            //remove permissions and apollo token from local storage
            window.localStorage.removeItem('permissions');
            window.localStorage.removeItem('apollo-token');
            router.push('/login')
            //reset the pinia store
            store.$reset();
        }


		return {
			logout,
            store
		};
	}
});
</script>
