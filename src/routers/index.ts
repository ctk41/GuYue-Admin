import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
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
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description Router interception beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1. Start NProgress
  NProgress.start();

  // 2. Dynamically set page title
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 3. If accessing login page: with Token stay on current page, without Token reset router and proceed to login
  if (to.path === LOGIN_URL) {
    if (userStore.token) return next(from.fullPath);
    resetRouter();
    return next();
  }

  // 4. If accessing page is in router whitelist, allow direct access
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5. Check if Token exists, redirect to login if not
  if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 6. If menu list doesn't exist, request menu list and add dynamic routes
  const authStore = useAuthStore();
  authStore.setRouteName(to.name as string);
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // 7. Normal page access
  next();
});

/**
 * @description Reset router
 */
export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};

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
