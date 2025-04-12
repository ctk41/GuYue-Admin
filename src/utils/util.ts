import { isArray } from '@/utils/is';
import { RouteRecordRaw } from 'vue-router';

/**
 * @description Get localStorage
 * @param {String} key Storage name
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
};

/**
 * @description Store to localStorage
 * @param {String} key Storage name
 * @param {Any} value Storage value
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description Remove from localStorage
 * @param {String} key Storage name
 * @return void
 */
export const localRemove = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * @description Clear all localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear();
};

/**
 * @description Determine data type
 * @param {Any} val Data to determine type
 * @return string
 */
export const isType = (val: any) => {
  if (val === null) return 'null';
  if (typeof val !== 'object') return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description Generate unique UUID
 * @return string
 */
export const generateUUID = () => {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c: any) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performanceNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};

/**
 * Determine if two objects are equal
 * @param a First object to compare
 * @param b Second object to compare
 * @returns True if equal, false otherwise
 */
export const isObjectValueEqual = (a: { [key: string]: any }, b: { [key: string]: any }) => {
  if (!a || !b) return false;
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) return false;
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    let propA = a[propName];
    let propB = b[propName];
    if (!b.hasOwnProperty(propName)) return false;
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false;
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
};

/**
 * @description Generate random number
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @return number
 */
export const randomNum = (min: number, max: number): number => {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
};

/**
 * @description Get greeting based on current time
 * @return string
 */
export const getTimeState = () => {
  // Get current time
  let timeNow = new Date();
  // Get current hour
  let hours = timeNow.getHours();
  // Determine current time period
  if (hours >= 6 && hours <= 10) return `Good morning ⛅`;
  if (hours >= 10 && hours <= 14) return `Good noon 🌞`;
  if (hours >= 14 && hours <= 18) return `Good afternoon 🌞`;
  if (hours >= 18 && hours <= 24) return `Good evening 🌛`;
  if (hours >= 0 && hours <= 6) return `Good night 🌛`;
};

/**
 * @description Get browser default language
 * @return string
 */
export const getBrowserLang = () => {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = '';
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = 'zh_CN';
  } else {
    defaultBrowserLang = 'en';
  }
  return defaultBrowserLang;
};

/**
 * @description Recursively search for the route corresponding to the current route
 * @param {Array} menuList All menu list
 * @param {String} path Current access address
 * @return array
 */
export const filterCurrentRoute = (menuList: Menu.MenuOptions[], path: string) => {
  let result = {};
  for (let item of menuList) {
    if (item.path === path) return item;
    if (item.children) {
      const res = filterCurrentRoute(item.children, path);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

/**
 * @description Flatten array objects (mainly used to process route menus)
 * @param {Array} menuList All menu list
 * @return array
 */
export const getFlatArr = (menuList: Menu.MenuOptions[]) => {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
};

/**
 * @description Use recursion to filter routes that need to be cached (currently not used)
 * @param {Array} menuList All menu list
 * @param {Array} cacheArr Cached route menu names ['**','**']
 * @return array
 * */
export const getKeepAliveRouterName = (menuList: Menu.MenuOptions[], keepAliveArr: string[] = []) => {
  menuList.forEach(item => {
    item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name);
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveArr);
  });
  return keepAliveArr;
};

/**
 * @description Use recursion to filter out lists that need to be rendered in the left menu (excludes menus with isHide == true)
 * @param {Array} menuList All menu list
 * @return array
 * */
export const getShowMenuList = (menuList: Menu.MenuOptions[] = []) => {
  if (!menuList || !Array.isArray(menuList)) return [];
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    if (item.children?.length) {
      item.children = getShowMenuList(item.children);
    }
    return !item.meta?.isHide;
  });
};

/**
 * @description Use recursion to process route menu paths and generate a one-dimensional array (used in first version local route authentication)
 * @param {Array} menuList All menu list
 * @param {Array} menuPathArr One-dimensional array of menu addresses ['**','**']
 * @return array
 */
export const getMenuListPath = (menuList: Menu.MenuOptions[], menuPathArr: string[] = []) => {
  menuList.forEach((item: Menu.MenuOptions) => {
    typeof item === 'object' && item.path && menuPathArr.push(item.path);
    item.children?.length && getMenuListPath(item.children, menuPathArr);
  });
  return menuPathArr;
};

/**
 * @description Recursively find all breadcrumbs and store in pinia/vuex
 * @param {Array} menuList All menu list
 * @param {Object} result Output result
 * @param {Array} parent Parent menu
 * @returns object
 */
export const getAllBreadcrumbList = (
  menuList: Menu.MenuOptions[],
  result: { [key: string]: any } = {},
  parent = [],
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

/**
 * @description Format table cell default values (a-table-column)
 * @param {Number} row Row
 * @param {Number} col Column
 * @param {String} callValue Current cell value
 * @return string
 * */
export const defaultFormat = (row: number, col: number, callValue: any) => {
  // If current value is an array, join with / (customize according to requirements)
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--';
  return callValue ?? '--';
};

/**
 * @description Handle no data situation
 * @param {String} callValue Value to process
 * @return string
 * */
export const formatValue = (callValue: any) => {
  // If current value is an array, join with / (customize according to requirements)
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--';
  return callValue ?? '--';
};

/**
 * @description Handle prop for multi-level nesting (e.g., prop:user.name)
 * @param {Object} row Current row data
 * @param {String} prop Current prop
 * @return any
 * */
export const handleRowAccordingToProp = (row: { [key: string]: any }, prop: string) => {
  if (!prop.includes('.')) return row[prop] ?? '--';
  prop.split('.').forEach(item => (row = row[item] ?? '--'));
  return row;
};

/**
 * @description Process prop, when prop is multi-level nested ==> return the last level prop
 * @param {String} prop Current prop
 * @return string
 * */
export const handleProp = (prop: string) => {
  const propArr = prop.split('.');
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
};

/**
 * @description Query required data based on enumeration list (if label and value key values are specified, format will be automatically recognized)
 * @param {String} callValue Current cell value
 * @param {Array} enumData Dictionary list
 * @param {Array} fieldNames Specify label and value key values
 * @param {String} type Filter type (currently only tag)
 * @return string
 * */
export const filterEnum = (
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
  type?: string,
): string => {
  const value = fieldNames?.value ?? 'value';
  const label = fieldNames?.label ?? 'label';
  let filterData: { [key: string]: any } = {};
  if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue);
  if (type == 'tag') return filterData?.tagType ? filterData.tagType : '';
  return filterData ? filterData[label] : '--';
};

/**
 * @description Transform data to tree function
 * @param {String} idStr Data unique identifier
 * @param {Array} pidStr Parent node identifier
 * @return Array tree object
 * */
export const transformDataToTree = (data: object[], idStr: string, pidStr: string): any[] => {
  let tree: any = [];
  if (!isArray(data)) {
    return [];
  }
  // Convert array to object (key-value pair), using ID as property name and original array object as property value
  let map: any = {};
  data.forEach((item: any) => {
    map[item[idStr]] = item;
  });
  // Use object property name (ID) to find parent node, extract object stored in map and place in parent node's children array
  data.forEach((item: any) => {
    let parent = map[item[pidStr]];

    // Modify object property
    delete item[pidStr];

    if (parent) {
      // If map[item.pid] has value, then parent is item's parent
      // Check if parent has children, if not create it, if yes push item to children
      (parent.children || (parent.children = [])).push(item);
    } else {
      // If map[item.pid] cannot find value, this item is first level
      tree.push(item);
    }
  });
  return tree;
};

/**
 * @description Dynamically import SVG images
 * @param {String} name
 * @return
 * */
export const getSvgImage = (name: string) => {
  return new URL(`/src/assets/icons/${name}.svg`, import.meta.url).pathname;
};

/**
 * Convert MenuOptions to RouteRecordRaw
 * @param menuList MenuOptions array
 * @returns RouteRecordRaw array
 */
export const transformMenuToRoutes = (menuList: Menu.MenuOptions[]): RouteRecordRaw[] => {
  return menuList.map(item => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: typeof item.component === 'string' ? () => import(`@/views${item.component}.vue`) : item.component,
      meta: {
        ...item.meta,
        title: item.meta.title,
        icon: item.meta.icon,
        isLink: item.meta.isLink,
        isHide: item.meta.isHide,
        isFull: item.meta.isFull,
        isAffix: item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive || true,
      },
    } as RouteRecordRaw;

    if (item.redirect) {
      route.redirect = item.redirect;
    }

    if (item.children && item.children.length > 0) {
      route.children = transformMenuToRoutes(item.children);
    }

    return route;
  });
};
