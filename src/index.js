import { Button } from 'element-ui'
import LeftMenu from './left-menu.vue'
// const components = [LeftMenu]
// const install = function (Vue) {
//     components.forEach((component) => {
//         Vue.component(component.name, component)
//     })
// }
// export default {
//     install,
// }
LeftMenu.install = function(Vue) {
    Vue.use(Button)
    // Vue.use(Submenu)
    // Vue.use(MenuItem)
    // Vue.use(Icon)
    // Vue.use(Dropdown)
    // Vue.use(DropdownMenu)
    // Vue.use(DropdownItem)
    // Vue.use(Tooltip)
    Vue.component(LeftMenu.name, LeftMenu)
}
export default LeftMenu
