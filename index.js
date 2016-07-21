var Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const path = require('path');
const pick = require('lodash/pick');
const flatten = require('lodash/flatten');

prompt([
  {
    type: 'list',
    name: 'command',
    message: 'Which command do you want to use?',
    choices: ['component', 'reducer'],
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
  /index.jsx
  /__tests__/
    /__index.jsx
`,
    choices: [
      {
        name: ['/actions.js', '/__tests__/actions.js'],
        checked: true,
        value: ['/actions.js', '/__tests__/actions.js'],
      },
      {
        name: ['/reducer.js', '/__tests__/reducer.js'],
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
  /__tests__/
    /reducer.js
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
  const folderPath = path.join(process.cwd(), questions.name);
  const files = flatten(questions.files);

  return fs.mkdirAsync(folderPath)
  .catch((err) => {
    if (err.errno === -17) {
      console.warn(`Error: There is already a folder called ${questions.name}, remove the folder and try again.`);
    } else {
      throw new Error(err);
    }
  })
  .then(() => fs.mkdirAsync(path.join(folderPath, '__tests__')))
  .then(() => 
    Promise.all(files.map((file) => (
      fs.copyAsync(
        path.join(__dirname, 'snippets', file),
        path.join(process.cwd(), questions.name, file)
      )
    )))
   )
   .then(() => {
     console.log('DONE!');
   });
});

