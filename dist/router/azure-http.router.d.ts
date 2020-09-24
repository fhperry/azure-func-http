import { RequestMethod } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core';
export declare class AzureHttpRouter extends AbstractHttpAdapter {
  private readonly routerMethodFactory;
  constructor();
  handle(context: Record<string, any>, request: any): void;
  handleNotFound(
    context: Record<string, any>,
    method: string,
    originalUrl: string
  ): void;
  enableCors(options: CorsOptions): void;
  reply(response: any, body: any, statusCode?: number): void;
  status(response: any, statusCode: number): void;
  getHttpServer<T = any>(): T;
  getInstance<T = any>(): T;
  setHeader(response: any, name: string, value: string): any;
  getRequestMethod(request: any): string;
  getRequestUrl(request: any): string;
  getRequestHostname(request: any): string;
  createMiddlewareFactory(
    requestMethod: RequestMethod
  ): (path: string, callback: Function) => any;
  getType(): string;
  listen(port: any, ...args: any[]): void;
  render(response: any, view: string, options: any): void;
  redirect(response: any, statusCode: number, url: string): void;
  close(): void;
  initHttpServer(): void;
  useStaticAssets(options: any): void;
  setViewEngine(options: any): void;
  registerParserMiddleware(): void;
  setNotFoundHandler(handler: Function): void;
  setErrorHandler(handler: Function): void;
}
