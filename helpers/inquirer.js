const inquirer = require('inquirer')
require('colors')

// These are the choices that are going to be used by questions  
const choices = [ 
    {
        name: `${'1.'.blue} Create Task`,
        value: '1'
    },
    {
        name: `${'2.'.blue} List Tasks`,
        value: '2'
    },
    {
        name: `${'3.'.blue} List Completed Tasks`,
        value: '3'
    },
    
    {
        name: `${'4.'.blue} List Pending Tasks`,
        value: '4'
    },
    {
        name: `${'5.'.blue} Complete Task(s)`,
        value: '5'
    },
    {
        name: `${'6.'.blue} Delete Task`,
        value: '6'
    },
    {
        name: `${'0.'.blue} Exit `,
        value: '0'
    },
    

]

//This goes inside the prompt 
const questions = [{
    type: 'list',
    name: 'option',
    message: 'What Should I do?',
    choices
}]

const inquirerMenu = async() =>{
    console.log('========================='.blue)
    console.log("    Select An Option   ")
    console.log('========================= \n'.blue)
    
    const {option} = await inquirer.prompt(questions)
     
    return option
}

const pause = async () => {
    console.log('\n')
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `press ${'ENTER'.blue} to continue`
        }
    ])
}

const readInput = async (message) =>{
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate: (value) =>{
            if (value.length === 0 ) {
                return "This should not be empty";
            }
            return true 
        }     
    }]
    console.clear()
    const {desc} = await inquirer.prompt(question)
    return desc
}

const deleteMenu = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.blue; 

        return {
            value: task.id, 
            name: `${idx} ${task.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0'.blue + ' Cancel'
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Delete',
        choices
    }];

    const {id} = await inquirer.prompt(questions)

    return id 
    
} 

const confirm = async (message) => {
    const questions = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(questions)
    return ok

}

const showAllListTask = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.blue; 

        return {
            value: task.id, 
            name: `${idx} ${task.desc}`,
            checked: (task.completedBy) ? true : false
        }
    })

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'choices',
        choices
    }];

    const {ids} = await inquirer.prompt(questions)

    return ids 
    
} 


module.exports = {
    inquirerMenu,
    pause,
    readInput, 
    deleteMenu,
    confirm,
    showAllListTask
}