import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
import { LOGIN_URL, ROUTER_WHITE_LIST, HOME_URL } from '@/config';
import { staticRouter, errorRouter } from '@/routers/modules/staticRouter';
import NProgress from '@/config/nprogress';

/**
 * @description Dynamic router configuration introduction 📚
 * @param path ==> Menu path
 * @param name ==> Menu alias
 * @param redirect ==> Redirect address
 * @param component ==> View file path
 * @param meta ==> Menu information
 * @param meta.icon ==> Menu icon
 * @param meta.title ==> Menu title
 * @param meta.activeMenu ==> Menu that needs to be highlighted when current route is a detail page
 * @param meta.isLink ==> Whether it's an external link
 * @param meta.isHide ==> Whether to hide
 * @param meta.isFull ==> Whether it's fullscreen (example: data dashboard page)
 * @param meta.isAffix ==> Whether to fix in tabs nav
 * @param meta.isKeepAlive ==> Whether to cache
 * */
const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description Router interception beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  NProgress.start();

  const title = import.meta.env.VITE_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (ROUTER_WHITE_LIST.includes(to.path)) {
    return next();
  }

  if (!userStore.token) {
    if (to.path === LOGIN_URL) {
      return next();
    }
    return next({ path: LOGIN_URL, replace: true });
  }

  if (to.path === LOGIN_URL) {
    return next(HOME_URL);
  }

  authStore.setRouteName(to.name as string);

  next();
});

/**
 * @description Router navigation complete
 * */
router.afterEach(() => {
  NProgress.done();
});

/**
 * @description Router navigation error
 * */
router.onError(error => {
  NProgress.done();
  console.warn('Router error', error.message);
});

export default router;
