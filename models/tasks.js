require('colors')

const Task = require('./task')

class Tasks {
    _listing = {}
    
    constructor (){
        this._listing = {};
    }

    get listingArr(){
    //initialize an empty new array that's going to be used to add keys from _listing object
        const newTask = []
    //this will return an array of string with the keys of the properties passed 
        Object.keys(this._listing).forEach(name => {
        // get the values from the object _listing which is initialized upthere
            const task = this._listing[name];
            newTask.push(task)
        })
        return newTask
    }

    deleteTask = id => { 
        if(this._listing[id]){
            delete this._listing[id]
        }
    }

    LoadTasksFromArray = (task = []) => { 
        task.forEach(t => {
            this._listing[t.id] = t;
        })
    }

    CompletedTask = () => {

        this.listingArr.forEach((task, i) => {
            //if you want this number to start from 1 do this 
            const idx =` ${i + 1}`.blue;
            const {desc, completedBy} = task; 

            const state = (completedBy) ? 'Completed'.blue : 'Pending'.red;

            console.log(`${idx}. ${desc} :: ${state}`)
           
        })
    } 

    ListPendingAndCompletedTasks = (completed) => {

        this.listingArr.forEach((task, i) => {
            //if you want this number to start from 1 do this 
            const idx =` ${i + 1}`.blue;
            const {desc, completedBy} = task; 

            const state = (completedBy) ? 'Completed'.blue : 'Pending'.red;

            if(completed){
                //Check if theres something in completed by
                if(completedBy){
                    console.log(`${idx}. ${desc} :: ${completedBy.blue}`)
                }
            }else if(!completedBy){
                console.log(`${idx}. ${desc} :: ${state}`)
            }
            
           
        })
        // const list = this.listingArr; 

        // const newList = list.filter(task => {
        //     // if completed is true return an array which property completedBy contains something
        //     (completed) ? task.completedBy : !task.completedBy;  
        // })

        // // console.log(newList)
        // if(newList.length === 0) {
        //     console.log('There are no tasks yet'.red)
        // }

        // newList.forEach((task,i) => { 
        //     const idx =` ${i + 1}`.blue;
        //     const state = (completed) ? 'Completed'.blue : 'Pending'.red;
        //     console.log(`${idx}. ${task.desc} :: ${state}`)
        // })
    }

    CreateTask = (desc) => { 
        const task = new Task(desc)
        this._listing[task.id] = task; 
    }

    ToggleCompletedTasks = (ids = []) =>{
        ids.forEach(id => {
            const task = this._listing[id];

            if(!task.completedBy){
                this._listing[id].completedBy = new Date().toISOString()
            }
        })

        this.listingArr.forEach(task => {
            if(!ids.includes(task.id)){
                this._listing[task.id].completedBy = null;
            }
        })
    }
}

module.exports = Tasks
