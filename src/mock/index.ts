import { MockMethod } from 'vite-plugin-mock';
import userMock from './user';
import menuMock from './menu';
import authMock from './auth';

export default [...userMock, ...menuMock, ...authMock] as MockMethod[];
