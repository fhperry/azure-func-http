import { Context, HttpRequest } from '@azure/functions';
import { INestApplication } from '@nestjs/common';
export declare class AzureHttpAdapterStatic {
  handle(
    createApp: () => Promise<INestApplication>,
    context: Context,
    req: HttpRequest
  ): any;
  private createHandler;
  private hasGetTypeMethod;
}
export declare const AzureHttpAdapter: AzureHttpAdapterStatic;
