export default function plugins(rootPath, moduleName) {
  return {
    scssPath: `${rootPath}/plugins/${moduleName}/css/${moduleName}.scss`,
    hbsPath: `${rootPath}/plugins/${moduleName}/html/${moduleName}.hbs`,
    jsPath: `${rootPath}/plugins/${moduleName}/main.js`,
    coreCssPath: `${rootPath}/plugins/core/css`,
    constantPath: `${rootPath}/plugins/${moduleName}/js/constant.js`,
    docPath: `${rootPath}/plugins/${moduleName}/README.md`,
    cssDistPath: `${rootPath}/_dev/plugins/${moduleName}/css/${moduleName}.css`,
    jsDistPath: `${rootPath}/_dev/plugins/${moduleName}/${moduleName}.js`,
    testPath: `${rootPath}/plugins/${moduleName}/test/**/*.js`,
    jsFormattedPath: `${rootPath}/plugins/${moduleName}/**/*.js`,
    scssFormattedPath: `${rootPath}/plugins/${moduleName}/**/*.scss`
  }
}