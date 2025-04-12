import { createApp } from 'vue';
import App from './App.vue';

import 'ant-design-vue/dist/antd.variable.min.css';
import '@/styles/reset.less';
import '@/styles/common.less';
import '@/styles/antd.less';
import '@/assets/iconfont/iconfont.less';
import '@/assets/fonts/font.less';
import 'uno.css';
import * as Icons from '@ant-design/icons-vue';
import directives from '@/directives/index';
import router from '@/routers/index';
import I18n from '@/languages/index';
import pinia from '@/stores/index';
import 'virtual:svg-icons-register';
import { registerGlobComp } from '@/components/registerGlobComp';

const app = createApp(App);

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

registerGlobComp(app);

app.use(directives).use(router).use(I18n).use(pinia).mount('#app');
