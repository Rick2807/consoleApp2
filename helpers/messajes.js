require('colors')

const messajes = async () => {
    return new Promise(reject => {
        console.log('========================='.blue)
        console.log("    Select An Option   ")
        console.log('========================= \n'.blue)


        console.log(`${'1.'.blue} Create Task`)
        console.log(`${'2.'.blue} List Tasks`)
        console.log(`${'3.'.blue} List Completed Tasks`)
        console.log(`${'4.'.blue} List Pending Tasks`)
        console.log(`${'5.'.blue} Complete Task(s)`)
        console.log(`${'6.'.blue} Delete Task`)
        console.log(`${'0.'.blue} Exit \n`)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`Select An Option`, opt => {
            return reject(opt)
            readline.close()
        })
    })
}

const pause = () => {
    return new Promise(reject => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`press ${'ENTER'.blue} to continue`, opt => {
            readline.close()
            reject()
        })
    })
}

module.exports = {
    messajes,
    pause
}