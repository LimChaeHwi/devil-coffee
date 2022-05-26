export default class Barista {
    workingTime = 0
    completeProgress = 0
    completeTime = 0
    working
    wInterval
    cInterval
    speed
    coffee
    constructor(id, name) {
        this.id = id
        this.name = name
        this.working = 'N'
        this.coffee = ''
        this.speed = 7000
    }
    work() {
        this.wInterval = setInterval(()=>{
            this.workingTime++
        }, 1000)
    }
    leave() {
        clearInterval(this.wInterval)
    }
    make(orderCoffee) {
        this.working = 'Y'
        this.coffee = orderCoffee.name
        //  progressBar: +(100 / (time / 1000))
        //  time: -1000
        this.completeTime = parseInt(orderCoffee.time)
        this.cInterval = setInterval(()=> {
            this.completeProgress += Math.ceil(100 / (parseInt(orderCoffee.time) / this.speed) *10)/10
            this.completeTime -= this.speed
            console.log('this.completeProgress', this.completeProgress)
            if (this.completeProgress >= 100) {
                console.log('serve')
                this.serve(orderCoffee)
            }
        }, 1000)
    }
    serve(orderCoffee) {
        clearInterval(this.cInterval)
        this.completeProgress = 0   //  초기화
        this.completeTime = 0
        this.working = 'N'
        this.coffee = ''
        orderCoffee.finish()
    }
    isWorking() {
        return this.working == 'Y' ? true : false
    }
}