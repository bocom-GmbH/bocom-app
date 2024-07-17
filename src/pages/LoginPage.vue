<template>
    <q-page class="flex flex-center">
        <div class="flex flex-center">
            <q-img
                class="q-mb-lg"
                width="270px"
                src="../img/bocom_logo_mit_Claim_darunter_Marketing_für_Apotheken_tme.png"
            />
            <div class="flex flex-center" style="width: 70%">
                <q-input
                    class="q-mb-lg"
                    outlined
                    v-model="username"
                    label="Username"
                    style="width: 100%"
                />
                <q-input
                    class="q-mb-lg"
                    outlined
                    v-model="password"
                    label="Password"
                    type="password"
                    style="width: 100%"
                />
                <q-btn
                    :disable="password === '' || username === ''"
                    style="width: 100%"
                    class="bg-primary text-secondary"
                    no-caps
                    label="Anmelden"
                    @click="loginFunc"
                />
            </div>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useUserStore } from 'stores/authentication';
import { Cookies } from 'quasar';
import { loginWithTokenMutation } from 'src/apollo/mutations/user';
import { useRouter } from 'vue-router'
import { useApolloClient } from 'src/apollo/utils';



const router = useRouter();

const username = ref('');
const password = ref('');

const {
    mutate: login,
    error: loginError,
    loading: loading,
} = useMutation(loginWithTokenMutation);
const store = useUserStore();

const loginFunc = async () => {
    const loginData = await login({
        username: username.value,
        password: password.value,
    });
    Cookies.set('apollo-token', loginData?.data.login.token);
    window.localStorage.setItem(
        'permissions',
        loginData?.data.login.permissions
    );
    window.localStorage.setItem(
        'apollo-token',
        loginData?.data.login.token
    );
    store.setUserData(loginData?.data.login.token);
    store.setPermissions(
        window.localStorage.getItem('permissions')?.split(',')
    );
    useApolloClient();
    setTimeout(() => {
        router.push('/');
        //location.reload();
    }, 500);
}
</script>
