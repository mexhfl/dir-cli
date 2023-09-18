let inquirer = require('inquirer');

async function cmdConfirm() {
  const {confirmResult} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmResult',
      message: 'confirm?',
      choices: []
    }])
  return confirmResult
}

module.exports = cmdConfirm