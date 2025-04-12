import { message } from 'ant-design-vue';

export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      message.error('Request failed! Please try again later');
      break;
    case 401:
      message.error('Login expired! Please login again');
      break;
    case 403:
      message.error('Current account has no access permission!');
      break;
    case 404:
      message.error('The resource you are accessing does not exist!');
      break;
    case 405:
      message.error('Request method error! Please try again later');
      break;
    case 408:
      message.error('Request timeout! Please try again later');
      break;
    case 500:
      message.error('Service exception!');
      break;
    case 502:
      message.error('Gateway error!');
      break;
    case 503:
      message.error('Service unavailable!');
      break;
    case 504:
      message.error('Gateway timeout!');
      break;
    default:
      message.error('Request failed!');
  }
};
