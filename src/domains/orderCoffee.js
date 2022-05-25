export default class OrderCoffee {
    constructor(id, name, time) {
        this.id = id
        this.name = name
        this.time = time
        this.status = 'N'
    }
    making() {
        this.status = 'I'
    }
    finish() {
        this.status = 'Y'
    }
}