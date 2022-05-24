export default class Orders {
    status
    constructor(no, customerId, coffees) {
        this.no = no
        this.customerId = customerId
        this.coffees = coffees
    }
    setWait() {
        this.status = 'W'
    }
    setStart() {
        this.status = 'S'
    }
    setFinish() {
        this.status = 'F'
    }
}