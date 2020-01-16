import * as Joi from '@hapi/joi';
import { RequestHandler } from 'express';

export type IMethod = 'get' | 'put' | 'post' | 'patch' | 'delete';

export interface IRouteResult {
  get: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  post: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  put: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  patch: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  delete: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
}

export interface ISwaggerBaseDefinition {
  title: string;
  description: string;
  host: string;
  basePath: string;
}

export interface ISwaggerDefinition {
  swagger: string;
  host: string;
  basePath: string;
  info: {
    description: string;
    version: string;
    title: string;
    contact: {
      email: string;
    }
  };
  paths: {};
  definitions: {};
}

export interface ISwaggerHeader {
  name: string;
  type: string | number;
  description?: string;
  // required?: boolean; // TODO: Add this possibility!
}

export interface ISwaggerOptions {
  title?: string;
  description?: string;
  host?: string;
  basePath?: string;
  apiVersion?: '2.0' | '3.0';
  version?: string;
  auth?: 'basic';
  headers?: ISwaggerHeader[];
}

export interface IInput {
  body?: ISchema;
  query?: ISchema | object;
  params?: ISchema | object;
  headers?: string[];
}

export type IOutput = {
  [key: number]: ISchema | { [key: string]: ISchema };
};

export interface IDocsOptions {
  input?: IInput;
  output?: IOutput;
  schemaOptions?: object;
  tags?: string[];
  description?: string;
  summary?: string;
}

export interface IExecOptions extends IDocsOptions {
  docs?: boolean;
  method: IMethod;
  path: string;
  prefix?: string;
}

export interface IOptions extends IDocsOptions {
  docs?: boolean;
}

export interface IValidateResponse {
  isValid: boolean;
  errors?: Joi.ValidationErrorItem[];
}

export type ISchema = Joi.Schema & {
  _meta?: [];
};
