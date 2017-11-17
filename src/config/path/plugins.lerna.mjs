export default function pluginLerna(rootPath, moduleName) {
  const modulePath = `${rootPath}/packages/${moduleName}`
  const moduleDistPath = `${modulePath}/dist`
  const config = {
    modulePath,
    moduleDistPath,
    scssPath: `${modulePath}/src/css/${moduleName}.scss`,
    hbsPath: `${modulePath}/src/html/${moduleName}.hbs`,
    jsPath: `${modulePath}/src/main.js`,
    coreCssPath: `${rootPath}/packages/core/src/css`,
    constantPath: `${modulePath}/src/constant.js`,
    docPath: `${modulePath}/README.md`,
    testPath: `${modulePath}/test/**/*.js`,
    jsFormattedPath: `${modulePath}/**/*.js`,
    scssFormattedPath: `${modulePath}/**/*.scss`
  }
  return config
}