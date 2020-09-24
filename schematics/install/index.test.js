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
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
const getFileContent = (tree, path) => {
    const fileEntry = tree.get(path);
    if (!fileEntry) {
        throw new Error(`The file does not exist.`);
    }
    return fileEntry.content.toString();
};
describe('Schematic Tests Nest Add', () => {
    let nestTree;
    const runner = new testing_1.SchematicTestRunner('azure-func-http', path.join(process.cwd(), 'schematics/collection.json'));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        nestTree = yield createTestNest(runner);
    }));
    describe('Test for default setup', () => {
        it('should add azure func for default setup', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                skipInstall: true,
                rootModuleFileName: 'app.module',
                rootModuleClassName: 'AppModule'
            };
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const files = tree.files;
            expect(files).toEqual([
                '/.eslintrc.js',
                '/.prettierrc',
                '/README.md',
                '/nest-cli.json',
                '/package.json',
                '/tsconfig.build.json',
                '/tsconfig.json',
                '/.funcignore',
                '/host.json',
                '/local.settings.json',
                '/proxies.json',
                '/src/app.controller.spec.ts',
                '/src/app.controller.ts',
                '/src/app.module.ts',
                '/src/app.service.ts',
                '/src/main.ts',
                '/src/main.azure.ts',
                '/test/app.e2e-spec.ts',
                '/test/jest-e2e.json',
                '/main/function.json',
                '/main/index.ts',
                '/main/sample.dat'
            ]);
        }));
        it('should have a nest-cli.json for default app', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                sourceRoot: 'src',
                skipInstall: true,
                rootDir: 'src',
                rootModuleFileName: 'app.module',
                rootModuleClassName: 'AppModule'
            };
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, '/nest-cli.json');
            expect(fileContent).toContain(`"sourceRoot": "src"`);
        }));
        it('should import the app.module int main azure file for default app', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                sourceRoot: 'src',
                skipInstall: true,
                rootDir: 'src',
                rootModuleFileName: 'app.module',
                rootModuleClassName: 'AppModule'
            };
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, '/src/main.azure.ts');
            expect(fileContent).toContain(`import { AppModule } from './app.module';`);
        }));
        it('should have the root dir for index file in main azure dir for default app', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                sourceRoot: 'src',
                skipInstall: true,
                rootDir: 'src',
                rootModuleFileName: 'app.module',
                rootModuleClassName: 'AppModule'
            };
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, '/main/index.ts');
            expect(fileContent).toContain(`import { createApp } from '../src/main.azure';`);
        }));
        it('should not import the webpack config for a default app', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                sourceRoot: 'src',
                skipInstall: true,
                rootDir: 'src',
                rootModuleFileName: 'app.module',
                rootModuleClassName: 'AppModule'
            };
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = tree.get('webpack.config.js');
            expect(fileContent).toBeNull();
        }));
    });
    describe('Tests for monorepo', () => {
        it('should add azure-func for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                rootDir: `apps/${projectName}`,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const files = tree.files;
            expect(files).toEqual([
                '/.eslintrc.js',
                '/.prettierrc',
                '/README.md',
                '/nest-cli.json',
                '/package.json',
                '/tsconfig.build.json',
                '/tsconfig.json',
                '/.funcignore',
                '/host.json',
                '/local.settings.json',
                '/proxies.json',
                '/src/app.controller.spec.ts',
                '/src/app.controller.ts',
                '/src/app.module.ts',
                '/src/app.service.ts',
                '/src/main.ts',
                '/test/app.e2e-spec.ts',
                '/test/jest-e2e.json',
                '/apps/nestjs-azure-func-http/tsconfig.app.json',
                `/apps/${projectName}/tsconfig.app.json`,
                `/apps/${projectName}/src/app.controller.spec.ts`,
                `/apps/${projectName}/src/app.controller.ts`,
                `/apps/${projectName}/src/app.module.ts`,
                `/apps/${projectName}/src/app.service.ts`,
                `/apps/${projectName}/src/main.ts`,
                `/apps/${projectName}/src/main.azure.ts`,
                `/apps/${projectName}/test/app.e2e-spec.ts`,
                `/apps/${projectName}/test/jest-e2e.json`,
                `/${projectName}/function.json`,
                `/${projectName}/index.ts`,
                `/${projectName}/sample.dat`,
                `/${projectName}/webpack.config.js`
            ]);
        }));
        it('should have a nest-cli.json for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, '/nest-cli.json');
            const parsedFile = JSON.parse(fileContent);
            expect(parsedFile.projects[projectName].sourceRoot).toEqual(`apps/${projectName}/src`);
        }));
        it('should import the app.module int main azure file for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, `/apps/${projectName}/src/main.azure.ts`);
            expect(fileContent).toContain(`import { AppModule } from './app.module';`);
        }));
        it('should have the root dir for index file in main azure dir for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, `/${projectName}/index.ts`);
            expect(fileContent).toContain(`import { createApp } from '../apps/${projectName}/src/main.azure';`);
        }));
        it('should import the webpack config for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                rootDir: `apps/${projectName}`,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, `/${projectName}/webpack.config.js`);
            expect(fileContent).toContain(`filename: '${projectName}/index.js'`);
        }));
        it('should add a custom webpack config to the compilerOptions for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, 'nest-cli.json');
            const parsedFile = JSON.parse(fileContent);
            const compilerOptions = parsedFile.projects[projectName].compilerOptions;
            expect(compilerOptions).toEqual({
                tsConfigPath: `apps/${projectName}/tsconfig.app.json`,
                webpack: true,
                webpackConfigPath: `${projectName}/webpack.config.js`
            });
        }));
        it('should the scriptFile of functions to sub dir for monorepo app', () => __awaiter(void 0, void 0, void 0, function* () {
            const projectName = 'azure-2';
            const options = {
                skipInstall: true,
                project: projectName,
                rootDir: `apps.${projectName}`,
                sourceRoot: `apps/${projectName}/src`
            };
            yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'sub-app', {
                name: projectName
            }, nestTree)
                .toPromise();
            const tree = yield runner
                .runSchematicAsync('nest-add', options, nestTree)
                .toPromise();
            const fileContent = getFileContent(tree, `${projectName}/function.json`);
            const parsedFile = JSON.parse(fileContent);
            expect(parsedFile.scriptFile).toEqual(`../dist/${projectName}/index.js`);
        }));
    });
    function createTestNest(runner, tree) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield runner
                .runExternalSchematicAsync('@nestjs/schematics', 'application', {
                name: 'newproject',
                directory: '.'
            }, tree)
                .toPromise();
        });
    }
});
