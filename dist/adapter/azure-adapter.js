"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandlerAdapter = void 0;
const azure_request_1 = require("./azure-request");
const azure_reply_1 = require("./azure-reply");
function createHandlerAdapter(handler) {
    return context => {
        context.res = context.res || {};
        const req = new azure_request_1.AzureRequest(context);
        const res = new azure_reply_1.AzureReply(context);
        handler(req, res);
    };
}
exports.createHandlerAdapter = createHandlerAdapter;
