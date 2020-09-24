/// <reference types="node" />
import { Readable } from 'stream';
export declare class AzureRequest extends Readable {
  readonly url: string;
  readonly context: Record<string, any>;
  readonly originalUrl: string;
  readonly headers: Record<string, any>;
  readonly body: any;
  constructor(context: Record<string, any>);
}
