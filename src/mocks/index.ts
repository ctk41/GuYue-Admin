import { MockMethod } from 'vite-plugin-mock';
import userMock from './user';
import authMock from './auth';

export default [...userMock, ...authMock] as MockMethod[];
