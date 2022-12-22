import { AxiosResponse } from 'axios';

import { http } from '../index';

import { LoggerListResponse } from 'lib/types/logger';

export const getList = (): Promise<AxiosResponse<LoggerListResponse>> => {
  return http.get(`/a2fbc23e-069e-4ba5-954c-cd910986f40f`);
};
