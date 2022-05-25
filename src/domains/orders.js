export default class Orders {
    status
    constructor(no, customerId, coffees) {
        this.no = no
        this.customerId = customerId
        this.coffees = coffees
    }
    waitOrders() {
        this.status = 'W'
    }
    startOrders() {
        this.status = 'S'
    }
    finishOrders() {
        this.status = 'F'
    }
}