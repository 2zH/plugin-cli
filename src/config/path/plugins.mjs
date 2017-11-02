export default function plugins(rootPath, moduleName) {
  const modulePath = `${rootPath}/plugins/${moduleName}`
  const moduleDistPath = `${rootPath}/_dev/plugins/${moduleName}`
  const config = {
    modulePath,
    moduleDistPath,
    scssPath: `${modulePath}/css/${moduleName}.scss`,
    hbsPath: `${modulePath}/html/${moduleName}.hbs`,
    jsPath: `${modulePath}/main.js`,
    coreCssPath: `${rootPath}/plugins/core/css`,
    constantPath: `${modulePath}/js/constant.js`,
    docPath: `${modulePath}/README.md`,
    cssDistPath: `${moduleDistPath}/css/${moduleName}.css`,
    jsDistPath: `${moduleDistPath}/${moduleName}.js`,
    testPath: `${modulePath}/test/**/*.js`,
    jsFormattedPath: `${modulePath}/**/*.js`,
    scssFormattedPath: `${modulePath}/**/*.scss`
  }

  return config
}