"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureReply = void 0;
const http_1 = require("http");
class AzureReply extends http_1.OutgoingMessage {
    constructor(context) {
        super();
        this._headerSent = true;
        this.writeHead = this.writeHead.bind(this, context);
        this.end = this.finish.bind(this, context);
    }
    writeHead(context, statusCode, statusMessage, headers) {
        if (statusCode) {
            this.statusCode = statusCode;
        }
        if (headers) {
            const keys = Object.keys(headers);
            for (const key of keys) {
                this.setHeader(key, headers[key]);
            }
        }
        context.res.status = this.statusCode;
        context.res.headers = this.getHeaders() || {};
    }
    finish(context, body) {
        if (body === undefined && this.outputData.length > 0) {
            body = Buffer.concat(this.outputData.map(o => Buffer.isBuffer(o.data) ? o.data : Buffer.from(o.data)));
        }
        context.res.status = this.statusCode;
        context.res.body = body;
        context.done();
    }
}
exports.AzureReply = AzureReply;
