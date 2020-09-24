"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const DEFAULT_PATH_NAME = 'apps';
function addDependenciesAndScripts() {
    return (host) => {
        dependencies_1.addPackageJsonDependency(host, {
            type: dependencies_1.NodeDependencyType.Default,
            name: '@azure/functions',
            version: '^1.0.3'
        });
        const pkgPath = '/package.json';
        const buffer = host.read(pkgPath);
        if (buffer === null) {
            throw new schematics_1.SchematicsException('Could not find package.json');
        }
        const pkg = JSON.parse(buffer.toString());
        pkg.scripts['start:azure'] = 'npm run build && func host start';
        host.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
        return host;
    };
}
function updateJsonFile(host, path, callback) {
    const source = host.read(path);
    if (source) {
        const sourceText = source.toString('utf-8');
        const json = core_1.parseJson(sourceText);
        callback(json);
        host.overwrite(path, JSON.stringify(json, null, 2));
    }
    return host;
}
const applyProjectName = (projectName, host) => {
    if (projectName) {
        let nestCliFileExists = host.exists('nest-cli.json');
        if (nestCliFileExists) {
            updateJsonFile(host, 'nest-cli.json', (optionsFile) => {
                if (optionsFile.projects[projectName].compilerOptions) {
                    optionsFile.projects[projectName].compilerOptions = Object.assign(Object.assign({}, optionsFile.projects[projectName].compilerOptions), {
                        webpack: true,
                        webpackConfigPath: `${projectName}/webpack.config.js`
                    });
                }
            });
        }
    }
};
const rootFiles = [
    '/.funcignore',
    '/host.json',
    '/local.settings.json',
    '/proxies.json'
];
const validateExistingRootFiles = (host, file) => {
    return rootFiles.includes(file.path) && host.exists(file.path);
};
function default_1(options) {
    return (host, context) => {
        if (!options.skipInstall) {
            context.addTask(new tasks_1.NodePackageInstallTask());
        }
        const defaultSourceRoot = options.project !== undefined ? options.sourceRoot : options.rootDir;
        const rootSource = schematics_1.apply(options.project ? schematics_1.url('./files/project') : schematics_1.url('./files/root'), [
            schematics_1.template(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { rootDir: options.rootDir, sourceRoot: defaultSourceRoot, getRootDirectory: () => options.rootDir, getProjectName: () => options.project, stripTsExtension: (s) => s.replace(/\.ts$/, ''), getRootModuleName: () => options.rootModuleClassName, getRootModulePath: () => options.rootModuleFileName })),
            schematics_1.forEach((file) => {
                if (validateExistingRootFiles(host, file))
                    return null;
                return file;
            })
        ]);
        return schematics_1.chain([
            (tree, context) => options.project
                ? applyProjectName(options.project, host)
                : schematics_1.noop()(tree, context),
            addDependenciesAndScripts(),
            schematics_1.mergeWith(rootSource)
        ]);
    };
}
exports.default = default_1;
