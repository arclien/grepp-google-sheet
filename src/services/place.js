import { decamelizeKeys } from 'humps';
import qs from 'qs';

import { ReactTemplateApi } from './api';

// TODO
export const getPlacesByLocation = (params) => {
  const queryParams = qs.stringify(decamelizeKeys(params));
  return ReactTemplateApi.get(`/places?${queryParams}`);
};

// TODO
export const getPlaceInfoById = (id) => {
  return ReactTemplateApi.get(`/place?id=${id}`);
};

// TODO
export const addPlace = (placeInfo) => {
  return ReactTemplateApi.post(`/place`, placeInfo);
};
