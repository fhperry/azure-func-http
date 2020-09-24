"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureHttpRouter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const router_method_factory_1 = require("@nestjs/core/helpers/router-method-factory");
const cors = require("cors");
const TRouter = require("trouter");
const adapter_1 = require("../adapter");
class AzureHttpRouter extends core_1.AbstractHttpAdapter {
    constructor() {
        super(new TRouter());
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
    }
    handle(context, request) {
        const req = context.req;
        const originalUrl = req.originalUrl;
        const path = new URL(originalUrl).pathname;
        const { params, handlers } = this.instance.find(req.method, path);
        req.params = params;
        if (handlers.length === 0) {
            return this.handleNotFound(context, req.method, originalUrl);
        }
        const azureRequest = new adapter_1.AzureRequest(context);
        const azureReply = new adapter_1.AzureReply(context);
        const nextRoute = (i = 0) => handlers[i] &&
            handlers[i](azureRequest, azureReply, () => nextRoute(i + 1));
        nextRoute();
    }
    handleNotFound(context, method, originalUrl) {
        context.res.status = common_1.HttpStatus.NOT_FOUND;
        context.res.body = {
            statusCode: common_1.HttpStatus.NOT_FOUND,
            error: `Cannot ${method} ${originalUrl}`
        };
        context.done();
        return;
    }
    enableCors(options) {
        this.use(cors(options));
    }
    reply(response, body, statusCode) {
        response.writeHead(statusCode);
        response.end(body);
    }
    status(response, statusCode) {
        response.statusCode = statusCode;
    }
    getHttpServer() {
        return this.instance;
    }
    getInstance() {
        return this.instance;
    }
    setHeader(response, name, value) {
        return response.setHeader(name, value);
    }
    getRequestMethod(request) {
        return request.method;
    }
    getRequestUrl(request) {
        return request.url;
    }
    getRequestHostname(request) {
        return request.hostname;
    }
    createMiddlewareFactory(requestMethod) {
        return this.routerMethodFactory
            .get(this.instance, requestMethod)
            .bind(this.instance);
    }
    getType() {
        return 'azure-http';
    }
    listen(port, ...args) { }
    render(response, view, options) { }
    redirect(response, statusCode, url) { }
    close() { }
    initHttpServer() { }
    useStaticAssets(options) { }
    setViewEngine(options) { }
    registerParserMiddleware() { }
    setNotFoundHandler(handler) { }
    setErrorHandler(handler) { }
}
exports.AzureHttpRouter = AzureHttpRouter;
