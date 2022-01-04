import { camelizeKeys, decamelizeKeys } from 'humps';

import { errorToast } from 'utils/toast';

export const requestInterceptor = (config) => {
  config.data = decamelizeKeys(config.data);
  return config;
};

export const responseInterceptorByStatus = ({ data }) => {
  switch (data.code) {
    case 'ok':
      return Promise.resolve(camelizeKeys(data));
    default:
      return Promise.reject(camelizeKeys(data));
  }
};

export const responseInterceptor = (response) => {
  return Promise.resolve(camelizeKeys(response.data));
};

export const rejectInterceptor = (error) => {
  const status = error?.response?.status;
  const errorMessage = error?.response?.data?.meta?.message;

  if (status === 401) {
    return Promise.reject(error);
  }

  if (errorMessage) {
    errorToast(errorMessage);
    return Promise.reject(error);
  }

  if (status === 403) {
    errorToast(`허용되지 않은 요청입니다.`);
  } else if (status === 404) {
    errorToast('올바르지 않은 요청입니다');
  } else {
    errorToast(`일시적으로 오류가 발생했습니다.`);
  }

  return Promise.reject(error);
};
