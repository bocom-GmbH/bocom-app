import { boot } from 'quasar/wrappers'
import { useTabStore } from 'src/stores/navigation-store'
import { getActiveTabByPath } from 'src/BottomMenuConfig'

const navigation = useTabStore()

export default boot(({ router }) => {
    router.beforeEach((to) => {
        if(to.path.split('/').length > 2) {
            navigation.setBackButtonAvailable(true)
            //console.log(getActiveTabByPath(to.path.split('/')[1]))
            //navigation.setActiveTab(getActiveTabByPath(to.path.split('/')[1]))
            //console.log(to.path)
            //console.log(    (to.path.split('/')[1]))
        } else {
            navigation.setBackButtonAvailable(false)

        }
    })
})
