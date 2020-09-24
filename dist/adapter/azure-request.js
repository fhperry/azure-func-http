"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureRequest = void 0;
const stream_1 = require("stream");
class AzureRequest extends stream_1.Readable {
    constructor(context) {
        super();
        Object.assign(this, context.req);
        this.context = context;
        this.url = this.originalUrl;
        this.headers = this.headers || {};
        const body = Buffer.isBuffer(context.req.body)
            ? context.req.body
            : context.req.rawBody;
        if (body !== null && body !== undefined) {
            this.push(body);
        }
        this.push(null);
    }
}
exports.AzureRequest = AzureRequest;
