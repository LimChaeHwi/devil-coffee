export default class Barista {
    workingTime = 0
    completeTime = 0
    working
    constructor(id, name) {
        this.id = id
        this.name = name
        this.working = 'N'
    }
    work() {
        setInterval(()=>{
            this.workingTime++
        }, 1000)
    }
    checkOrders() {

    }
    findMachine() {

    }
    make() {

    }
    serve() {

    }
}