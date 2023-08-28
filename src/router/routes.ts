import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/ActivityPage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/ActivityPage', component: () => import('pages/ActivityPage.vue') }],
  },
  {
    path: '/FileEditorPage',
    name: 'FileEditorPage',
    props: true,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: ':id', component: () => import('pages/file-editor-page/FileEditorPage.vue'), props: true }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
