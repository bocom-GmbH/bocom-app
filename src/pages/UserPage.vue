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

        const logout = () => {
            Cookies.remove('apollo-token')
            store.resetUserAuthentication();
            window.localStorage.removeItem('permissions');
            router.push('/login')
            store.$reset();
        }


		return {
			logout,
            store
		};
	}
});
</script>
