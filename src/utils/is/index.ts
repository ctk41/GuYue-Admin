const toString = Object.prototype.toString;

/**
 * @description: Check if value is of certain type
 */
export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

/**
 * @description: Check if value is a function
 */
export const isFunction = <T = Function>(val: unknown): val is T => {
  return is(val, 'Function');
};

/**
 * @description: Check if value is defined
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

/**
 * @description: Check if value is undefined
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * @description: Check if value is an object
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

/**
 * @description: Check if value is a date
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date');
};

/**
 * @description: Check if value is a number
 */
export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number');
};

/**
 * @description: Check if value is an AsyncFunction
 */
export const isAsyncFunction = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, 'AsyncFunction');
};

/**
 * @description: Check if value is a promise
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/**
 * @description: Check if value is a string
 */
export const isString = (val: unknown): val is string => {
  return is(val, 'String');
};

/**
 * @description: Check if value is a boolean
 */
export const isBoolean = (val: unknown): val is boolean => {
  return is(val, 'Boolean');
};

/**
 * @description: Check if value is an array
 */
export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val);
};

/**
 * @description: Check if environment is client
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};

/**
 * @description: Check if value is a window object
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

/**
 * @description: Check if value is an element
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: Check if environment is server
 */
export const isServer = typeof window === 'undefined';

/**
 * @description: Check if DOM element is an image
 */
export const isImageDom = (o: Element) => {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
};

/**
 * @description: Check if value is null
 */
export const isNull = (val: unknown): val is null => {
  return val === null;
};

/**
 * @description: Check if value is null and undefined
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val);
};

/**
 * @description: Check if value is null or undefined
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};
