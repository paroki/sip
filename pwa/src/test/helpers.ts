import { setActivePinia } from 'pinia';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

export function tsBootstrapPinia(){
  const app = createApp({})
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
}
