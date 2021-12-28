import { createApp } from 'vue'
import { router, setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { registerGlobComp } from '/@/components/registerGlobComp';

import App from './App.vue'

async function bootstrap() {
    const app = createApp(App);

    // Configure store
    setupStore(app);

    // Register global components
    registerGlobComp(app);

    // Configure routing
    setupRouter(app);

    // Mount when the route is ready
    // https://next.router.vuejs.org/api/#isready
    await router.isReady();

    app.mount('#app', true);
}

void bootstrap();
