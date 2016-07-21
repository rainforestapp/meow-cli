var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: 'list',
    name: 'command',
    message: 'Which command do you want to use?',
    choices: ['component', 'reducer', 'utility'],
    default: 'component',
  },
  {
    type: 'string',
    name: 'name',
    message: 'Module name - (In CamelCaps please)',
    default: 'NoTitle',
  },
  {
    type: 'checkbox',
    name: 'files',
    message:
`Which files do you want to build (Press)
  /index.js
  /__tests/
`,
    choices: [
      {
        name: '/actions.js',
        checked: true,
      },
      {
        name: '/reducer.js',
        checked: true,
      },
      {
        name: '/schema.js',
        checked: false,
      },
      {
        name: '/style.css',
        checked: false,
      },
    ],
    when: (answers) => answers.command === 'component',
  },
  {
    type: 'checkbox',
    name: 'files',
    message:
`Which files do you want to build (Press)
  /reducer.js
  /__tests/
`,
    choices: [
      {
        name: '/schema.js',
        checked: false,
      },
      {
        name: '/__tests__/mockData.js',
        checked: true,
      },
    ],
    when: (answers) => answers.command === 'reducer',
  }
]).then(questions => {
  const filePath = process.cwd();
  console.log(questions);
});

