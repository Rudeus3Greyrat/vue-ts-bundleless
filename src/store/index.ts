import type { App } from 'vue';

import { createStore } from 'vuex'
// 导入文件
const files = import.meta.globEager('./modules/*.ts')
const modules = {}
for (const key in files) {
    const file = files[key].default;
    if(file != undefined){
        // 截取文件名
        modules[key.replace(/(\.\/modules\/)|(\.ts)/g, '')] = file
    }
}
export const store= createStore({
    modules,
})
export function setupStore(app: App<Element>) {
    app.use(store);
}