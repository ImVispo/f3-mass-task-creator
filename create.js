const fs = require('fs')
const config = require('./config')

console.log(`
************************************
***                              ***
***  F3 TASK GENERATOR BY VISPO  ***
***                              ***
************************************
`)

console.log('Importing profiles...')
fs.readFile('profiles.txt', 'utf-8', (err, data) => {

  if (err) {
    console.log(err)
    return
  }

  let profiles = data.split(';').map(p => JSON.parse(p))

  let tasks = []
  let taskPromises = []

  console.log(`Creating ${config.delays.length} tasks for ${profiles.length} profiles...`)

  for (let profile of profiles) {

    for (let delay of config.delays) {
  
      taskPromises.push(new Promise(async resolve => {
        let task = { ...config.task, profile: profile.profileNickname, delay: delay }
        tasks.push(task)
        resolve()
      }))
      
    }
  
  }
  
  Promise.all(taskPromises).then(() => {
    console.log(`Saving tasks...`)
    fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`${config.delays.length * profiles.length} tasks saved successfully!`)
    })
  })

})