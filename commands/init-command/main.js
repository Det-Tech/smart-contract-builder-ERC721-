const symbols = require('log-symbols')
const chalk = require('chalk')
chalk.level = 1
const fs = require('fs').promises;
const ncp = require('ncp');
const { promisify } = require('util');
const copy = promisify(ncp);
const { showTable } = require(`${__dirname}/../../util/showTable`)
const {processAnswers} = require('./answers');

async function copyTemplateFiles(src, dst) {

  await fs.mkdir(`${dst}`, function(err) {
    if(err) {
      console.log(err);
    }
  });
  return copy(src, dst, {
    clobber: false,
  });

}

async function createSmartContract(file, content) {

  await fs.writeFile(`${file}`, content, 'utf-8', err => {
    if (err) console.log(chalk.red(symbols.error), chalk.red(err))
  });
  
}

async function createDeployScript(projectName, deployConstructorArgument) {

  let deployContent = `import { ethers } from "hardhat";\n\n`;
    deployContent += `async function main() {\n\n`;
    deployContent += `  const contractDeploy = await ethers.getContractFactory("${projectName}");\n`;
    deployContent += `  const ${projectName} = await contractDeploy.deploy(${deployConstructorArgument});\n`
  
    deployContent += `  await ${projectName}.deployed();\n`;
  
    deployContent += `  console.log("${projectName} deployed at:", ${projectName}.address);\n`;

    deployContent += `}\n`;
    deployContent += `main()\n  .then(() => process.exit(0))\n  .catch((error) => {\n    console.error(error);\n    process.exit(1);\n  });`;

    await fs.writeFile(`${projectName}/scripts/deploy.ts`, deployContent, 'utf-8', err => {
      if (err) console.log(chalk.red(symbols.error), chalk.red(err))      
    })
}

async function showProjectStatus(result, projectName) {

  if(result == "SUCCESS"){
    console.log('\n')
    console.log(chalk.green(symbols.success), chalk.green('Add a template successfully!\n'))
    console.log(chalk.green('The latest templateList is: \n'));
  } else {
    console.log('\n')
    console.log(chalk.green(symbols.error), chalk.green('Creating Template is failed!\n'))
    console.log(chalk.green('The latest templateList is: \n'));
  }
  var templateList = {
    "app":"https://gitlab.com/massless.io/smart-contract-library",
    "ContractName":`${projectName}`
  }
  showTable(templateList);
}

exports.main = async (answers) => {

  try{
    let {fileName, projectName, deployConstructorArgument, totalContent} = await processAnswers(answers);  
    // copying a project template
    console.log("Creating a project...");
    await copyTemplateFiles(`${__dirname}/../../templates/skeleton-project/`, projectName);

    // create smart contract
    console.log("Creating a smart contract file...");
    await createSmartContract(`${projectName}/contracts/${fileName}`, totalContent);

    // create deploy script
    console.log("Creating a deploy script...");
    await createDeployScript(`${projectName}`, deployConstructorArgument);

    showProjectStatus('SUCCESS', projectName);
  } catch(err) {
    showProjectStatus('FAIL', projectName);
  }
}