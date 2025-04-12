import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import createLogger from 'pinia-plugin-logger';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

if (import.meta.env.DEV) {
  pinia.use(
    createLogger({
      activate: true,
      expanded: true,
      store: true,
      timestamp: true,
      errors: true,
    }),
  );
}

export default pinia;
