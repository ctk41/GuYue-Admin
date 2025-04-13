/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: number;
  readonly VITE_OPEN: boolean;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_PWA: boolean;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_API_BACKEND_URL: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
