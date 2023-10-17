import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import LoginLayout from 'layouts/LoginLayout.vue';
import LoginPage from 'pages/LoginPage.vue';
import UserPage from 'pages/UserPage.vue';
import HomePage from 'pages/HomePage.vue';
import FileEditorPage from 'pages/file-editor-page/FileEditorPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/HomePage',
    },
    {
        path: '/HomePage',
        component: MainLayout,
        children: [{ path: '', component: HomePage }],
    },
    {
        path: '/login',
        component: LoginLayout,
        children: [{ path: '', component: LoginPage }],
    },
    {
        path: '/UserPage',
        component: MainLayout,
        children: [{ path: '', component: UserPage }],
    },
    {
        path: '/HomePage/FileEditorPage',
        name: 'FileEditorPage',
        props: true,
        component: MainLayout,
        children: [{ path: ':magazineId', component: FileEditorPage, props: true }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
