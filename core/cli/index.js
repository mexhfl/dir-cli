const rmDep = require("./rmdep");
const change = require("../cli/change")
const { program } = require('commander');


async function initFlow(args) {
  program
    .name('dir-cli')
    .usage('[command]')
    .helpOption(false)
    .addHelpCommand(false)
    .command('checkGitDir')
    .description('检查 [存在未提交更改] 的Git目录')
    .action(async () => {
      await change()
    })
  program
    .command('delNodeModules')
    .description('列出当前目录下所有 [node_modules]目录 确认后删除')
    .action(async () => {
      await rmDep()
    });

  program.parse(process.argv);
}

module.exports = initFlow