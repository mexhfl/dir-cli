const { getNodeModuleDirDeep } = require("../lib/getNodeModuleDir");
const cmdConfirm = require("./cmdConfirm");
const rimraf = require("rimraf");
const fs = require("fs")


async function rmDep() {
  let nodeModuleDirs = getNodeModuleDirDeep(process.cwd())
  console.log(nodeModuleDirs)
  if (!nodeModuleDirs.length) {
    console.log('--------未找到node_modules目录-------')
    return
  }
  let confirmResult = await cmdConfirm()
  if (!confirmResult) {
    console.log('--------exit-------')
    return
  }
  console.log('--------准备删除任务-------')
  nodeModuleDirs.forEach(dir => {
    fs.rmSync(dir, { recursive: true });
    console.log(`已删除 ${dir}`);
  });
  console.log('--------完成删除任务-------')
}

module.exports = rmDep