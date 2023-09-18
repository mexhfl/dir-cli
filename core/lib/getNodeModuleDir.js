const glob = require("glob");
const fs = require("fs")
const path = require("path")

function getNodeModuleDir(primer) {
  return new Promise((resolve, reject) => {
    let options = {
      root: process.cwd()
    }
    glob(primer, options, function (er, files) {
      resolve(files)
    })
  })
}


// 递归获取所有node_modules目录，但在找到node_modules后，不再深入该目录
function getNodeModuleDirDeep(startPath) {
  let results = [];
  const list = fs.readdirSync(startPath);
  for (let file of list) {
    file = path.resolve(startPath, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (path.basename(file) === 'node_modules') {
        results.push(file);
        // 找到node_modules后，不再深入
        continue;
      }
      results = results.concat(getNodeModuleDirDeep(file));
    }
  }

  return results;
}

module.exports = {
  getNodeModuleDir,
  getNodeModuleDirDeep
}