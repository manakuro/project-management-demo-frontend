module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which Atomic design level?',
        choices: ['atoms', 'molecules', 'organisms']
      },
      {
        type: 'input',
        name: 'component_name',
        message: 'What is the component name?'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Where is the directory(Optional)',
      },
    ]
    return inquirer
      .prompt(questions)
      .then(answers => {
        const { category, component_name, dir } = answers
        const path = `${category}/${ dir ? `${dir}/` : `` }${component_name}`
        const absPath = `src/components/UI/${path}`
        return { ...answers, path, absPath, category }
      })
  }
}
