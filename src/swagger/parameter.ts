const j2s = require('joi-to-swagger');
import * as _ from 'lodash';

import { IInput, ISwaggerDefinition, ISchema } from '../interfaces';
import { getDefinition } from './definition';

export const getParameters = (swagger: ISwaggerDefinition, input?: IInput) => {
  if (!input) return [];

  const { body, query, params, headers = [] } = input;
  const result: {
    in: string
    name: string
    required: boolean
    schema: {
      $ref: string,
    },
  }[] = [];

  if (body) {
    const definition = getDefinition(swagger, body, 'Input');
    result.push({
      in: 'body',
      name: definition,
      required: true,
      schema: {
        $ref: `#/definitions/${definition}`,
      },
    });
  }

  if (query) {
    const { swagger } = j2s(query as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'query',
        name: key,
        ...properties[key],
      });
    });
  }

  if (params) {
    const { swagger } = j2s(params as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'path',
        name: key,
        required: true,
        ...properties[key],
      });
    });
  }

  // Headers
  headers.forEach((header) => {
    result.push({
      in: 'header',
      name: _.camelCase(header),
      required: false, // TODO: Add this possibility
      schema: {
        $ref: `#/definitions/header_${header}`,
      },
    });
  });

  return result;
};
