import { Menu } from '@/types/menu';

export const staticMenu: Menu.MenuOptions[] = [
  {
    path: '/home/index',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      icon: 'HomeFilled',
      title: 'Workplace',
    },
  },
  {
    path: '/proTable',
    name: 'proTable',
    redirect: '/proTable/useProTable',
    meta: {
      icon: 'TableOutlined',
      title: 'Super Table',
    },
    children: [
      {
        path: '/proTable/useProTable',
        name: 'useProTable',
        component: () => import('@/views/proTable/useProTable/index.vue'),
        meta: {
          icon: 'InsertRowAboveOutlined',
          title: 'Simple Table',
        },
        children: [
          {
            path: '/proTable/useProTable/detail/:id',
            name: 'useProTableDetail',
            component: () => import('@/views/proTable/useProTable/detail.vue'),
            meta: {
              icon: 'FileTextOutlined',
              title: 'User Details',
              activeMenu: '/proTable/useProTable',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/dataVisualize',
    meta: {
      icon: 'DashboardOutlined',
      title: 'Dashboard',
    },
    children: [
      {
        path: '/dashboard/dataVisualize',
        name: 'dataVisualize',
        component: () => import('@/views/dashboard/dataVisualize/index.vue'),
        meta: {
          icon: 'FundViewOutlined',
          title: 'Control Panel',
        },
      },
      {
        path: '/dashboard/embedded',
        name: 'embedded',
        component: () => import('@/views/dashboard/embedded/index.vue'),
        meta: {
          icon: 'chromeOutlined',
          title: 'Embedded Pages',
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    redirect: '/form/proForm',
    meta: {
      icon: 'FileTextOutlined',
      title: 'Forms',
    },
    children: [
      {
        path: '/form/basicForm',
        name: 'basicForm',
        component: () => import('@/views/form/basicForm/index.vue'),
        meta: {
          icon: 'ProfileOutlined',
          title: 'Basic Form',
        },
      },
      {
        path: '/form/dynamicForm',
        name: 'dynamicForm',
        component: () => import('@/views/form/dynamicForm/index.vue'),
        meta: {
          icon: 'FileAddOutlined',
          title: 'Dynamic Form',
        },
      },
      {
        path: '/form/substepForm',
        name: 'substepForm',
        component: () => import('@/views/form/substepForm/index.vue'),
        meta: {
          icon: 'BarsOutlined',
          title: 'Step Form',
        },
      },
    ],
  },
  {
    path: '/about/index',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      icon: 'ProjectOutlined',
      title: 'About Project',
    },
  },
];
