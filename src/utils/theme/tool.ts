import { message } from 'ant-design-vue';

/**
 * Convert hex color to rgb color
 * @param str Color value string
 * @returns Processed color value
 */
export const hexToRgb = (str: any) => {
  let hexs: any = '';
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return message.warning('Invalid hex color input');
  str = str.replace('#', '');
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
};

/**
 * Convert rgb color to Hex color
 * @param r Represents red
 * @param g Represents green
 * @param b Represents blue
 * @returns Processed color value
 */
export const rgbToHex = (r: any, g: any, b: any) => {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return message.warning('Invalid rgb color input');
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join('')}`;
};

/**
 * Darken color value
 * @param color Color value string
 * @param level Darkening level, limited between 0-1
 * @returns Processed color value
 */
export const getDarkColor = (color: string, level: number) => {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return message.warning('Invalid hex color input');
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

/**
 * Lighten color value
 * @param color Color value string
 * @param level Lightening level, limited between 0-1
 * @returns Processed color value
 */
export const getLightColor = (color: string, level: number) => {
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return message.warning('Invalid hex color input');
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
