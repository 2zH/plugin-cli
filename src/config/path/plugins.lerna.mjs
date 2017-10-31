export default function pluginLerna(rootPath, moduleName) {
  return {
    scssPath: `${rootPath}/packages/${moduleName}/src/css/${moduleName}.scss`,
    hbsPath: `${rootPath}/packages/${moduleName}/src/html/${moduleName}.hbs`,
    jsPath: `${rootPath}/packages/${moduleName}/src/main.js`,
    coreCssPath: `${rootPath}/packages/core/src/css`,
    constantPath: `${rootPath}/packages/${moduleName}/src/constant.js`,
    docPath: `${rootPath}/packages/${moduleName}/README.md`,
    cssDistPath: `${rootPath}/packages/${moduleName}/dist/${moduleName}.css`,
    jsDistPath: `${rootPath}/packages/${moduleName}/dist/${moduleName}.js`,
    testPath: `${rootPath}/packages/${moduleName}/test/**/*.js`,
    jsFormattedPath: `${rootPath}/packages/${moduleName}/**/*.js`,
    scssFormattedPath: `${rootPath}/packages/${moduleName}/**/*.scss`
  }
}