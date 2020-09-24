"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureHttpAdapter = exports.AzureHttpAdapterStatic = void 0;
const azure_adapter_1 = require("./adapter/azure-adapter");
let handler;
class AzureHttpAdapterStatic {
    handle(createApp, context, req) {
        if (handler) {
            return handler(context, req);
        }
        this.createHandler(createApp).then(fn => fn(context, req));
    }
    createHandler(createApp) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = yield createApp();
            const adapter = app.getHttpAdapter();
            if (this.hasGetTypeMethod(adapter) && adapter.getType() === 'azure-http') {
                return adapter.handle.bind(adapter);
            }
            const instance = app.getHttpAdapter().getInstance();
            handler = azure_adapter_1.createHandlerAdapter(instance);
            return handler;
        });
    }
    hasGetTypeMethod(adapter) {
        return !!adapter.getType;
    }
}
exports.AzureHttpAdapterStatic = AzureHttpAdapterStatic;
exports.AzureHttpAdapter = new AzureHttpAdapterStatic();
