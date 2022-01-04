const getAppEnv = () => {
  return process.env.REACT_APP_ENV;
};

const getApiEndPoint = () => {
  switch (getAppEnv()) {
    case 'production':
      return '';
    case 'development':
    default:
      return '';
  }
};

export { getAppEnv, getApiEndPoint };
