const {inquirerMenu,
       pause,
       readInput,
       deleteMenu,
       confirm,
       showAllListTask
    } = require('./helpers/inquirer')
const { saveFile, readFile } = require('./helpers/saveFile')
const Tasks = require('./models/tasks')



 

const main = async () => {
    

    let opt = ''
    const tasks = new Tasks()

    const dbTasks = readFile();

    if(dbTasks) {
        // Establecer las tareas 
        tasks.LoadTasksFromArray(dbTasks)
    }



    do {
        opt = await inquirerMenu()
        
        switch (opt) {
            case '1':  
                const value = await readInput('Enter a value: ')  
                tasks.CreateTask(value)
                break;
                
            case '2': 
                console.log(tasks.CompletedTask())
                break; 

            case '3': 
                tasks.ListPendingAndCompletedTasks(true)
                break; 
            case '4': 
                tasks.ListPendingAndCompletedTasks(false)
                break; 
            case '5': 
                const ids = await showAllListTask(tasks.listingArr)
                tasks.ToggleCompletedTasks(ids)
                break; 
            case '6': 
                const id = await deleteMenu(tasks.listingArr)
                if(id !== '0'){
                    const ok = await confirm('Are you sure?')
                    if(ok){
                        tasks.deleteTask(id)
                        console.log("Task Deleted!")
                    }
                }
                break; 
        }
        saveFile(tasks.listingArr)

        await pause()
        console.clear()

    } while (opt !== '0')

    

   
}

main()

