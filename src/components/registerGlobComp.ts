import type { App } from 'vue';
import HelloWorld from "/@/components/HelloWorld.vue";

// global components to use
const compList = [HelloWorld];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
