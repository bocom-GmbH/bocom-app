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
    //The use of 'name' is not mandatory, but it facilitates routing. It is not yet in use anywhere for now.
    {
        path: '/HomePage/FileEditorPage',
        name: 'FileEditorPage',
        props: true,
        component: () => MainLayout,
        children: [
            //this route contains the magazineId as query parameter
            {
                path: ':magazineId',
                component: () => FileEditorPage,
                props: true,
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
