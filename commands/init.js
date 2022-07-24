#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const {question} = require('./init-command/questions');
const {main} = require('./init-command/main');

program
  .usage('[project-name]')
program.parse(process.argv)
// display Help
if (program.args.length < 1) {
  program.help();
  process.exit()
}
async function mainProcess() {
  var totalAnswer = [];

  for (i = 0; i < question.length; i++)
  {
    const answer = await inquirer.prompt([question[i]]);
    let val = answer[question[i].name].toUpperCase();
    if ((typeof question[i].subQuestions != "undefined") && (val == 'YES' || val == 'Y')){
      const subAnswers = await inquirer.prompt(question[i].subQuestions);
      answer.subAnwers = subAnswers;
    }
    totalAnswer.push(answer);
  }
  await main(totalAnswer);
}
mainProcess();
