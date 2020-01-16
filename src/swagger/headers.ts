import * as _ from 'lodash';
import { ISwaggerHeader } from '../interfaces';

export const getHeaders = (headers: ISwaggerHeader[] = []) => {
  return headers.reduce((acc, { name, type, description = '' }) => {
    return {
      ...acc,
      [`header_${name}`]: {
        type,
        description,
      },
    };
  }, {});
};
