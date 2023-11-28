import { computed } from 'vue'
import { BottomMenuItem } from './components/models';

//configuration file for the bottom menu

const bottomMenuList = computed<BottomMenuItem[]>(() => [
    {
        label: 'Startseite',
        name: 'HomePage',
        icon: 'las la-home',
        notification: 0,
        navigateToPath: '/HomePage',
    },
    {
        label: 'Benutzer',
        name: 'UserPage',
        icon: 'lar la-user',
        notification: 0,
        navigateToPath: '/UserPage',
    },
]);

//it returns the active tab (object) by path
const getActiveTabByPath = (path: any) => {
    const newPath = '/' + path
    return bottomMenuList.value.find((tab) => tab.navigateToPath === newPath)?.label;
}

export {
    bottomMenuList,
    getActiveTabByPath
}
