/// <reference types="node" />
import { OutgoingMessage } from 'http';
export declare class AzureReply extends OutgoingMessage {
  private readonly _headerSent;
  private readonly outputData;
  statusCode?: number;
  constructor(context: Record<string, any>);
  writeHead(
    context: Record<string, any>,
    statusCode: number,
    statusMessage: string,
    headers: Record<string, any>
  ): void;
  finish(
    context: Record<string, any>,
    body: Record<string, any> | undefined
  ): void;
}
