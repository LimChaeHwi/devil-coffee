<template>
  <div>
      <strong>메뉴</strong>
      <ul>
          <li v-for="(item, index) in menu" :key="index">
            <button @click="addCart(item)">{{ item.name }}</button>{{ item.price }}
          </li>
      </ul>
      <ul>
          <li v-for="(item, index) in cart" :key="index">
            <span>{{ item.name }}</span>
            <span>{{ item.count }} 잔</span>
          </li>
      </ul>
      <div>
      주문금액 {{ calculate }} 원
      </div>
      <div>
        <strong>사용자 이름</strong>
        <input type="text" v-model="newName" />
        <button @click="order()">주문하기</button>
      </div>
  </div>
</template>

<script>
import Coffee from '../domains/coffee.js'
import Customer from '../domains/customer.js'
import Orders from '../domains/orders.js'
import OrderCoffee from '../domains/orderCoffee.js'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name : 'Kiosk',
    props: {
        orderList : {type : Array, default : new Array(0)}
    },
    data : function() {
        return {
            menu: [
                new Coffee('AC', '아메리카노', 2000, 20000),
                new Coffee('CL', '카페라떼', 2500, 30000),
                new Coffee('CM', '카라멜마끼아또', 3500, 40000),
                new Coffee('EP', '아인슈페너', 4000, 60000),
            ],
            cart: [],
            orderCoffee: [],
            orderListData: [],
            newName: '',
        }
    }, 
    created: function() {
        
    },
    computed: {
        calculate: function() {
            let value = 0
            this.cart.forEach(element => {
                value += element.price
            });
            return value
        }
    },
    methods: {
        addCart: function(coffee) {
            let order = {...coffee}
            //  orderList 의 coffee 리스트
            this.orderCoffee.push(new OrderCoffee(order.id, order.name, order.time))
            //  제조시간이 긴 것부터 제조
            this.orderCoffee.sort((a, b) => b.time - a.time)

            let index = this.cart.findIndex((element)=> {
                return element.id === coffee.id
            })
            
            if (index == -1) {
                order['count'] = 1
                this.cart.push(order)
            } else {
                let newElement = this.cart[index]
                newElement['count']++
                newElement['price'] += order['price']

                this.cart.splice(index, 1, newElement)
            }
        },
        order: function() {
            if (this.cart.length == 0) {
                alert('메뉴를 선택해주세요.')
                return
            }
            if (!this.newName) {
                alert('이름을 입력해주세요.')
                return
            }
            let customerComp = this.$parent.$refs['customer']
            let customerId = customerComp.getCustomerSeqId()
            customerComp['customers'].push(new Customer(customerId, this.newName))

            this.orderListData = this.orderList
            
            let orders = new Orders(this.getOrderSequenceNo(), customerId, this.orderCoffee)
            orders.waitOrders()
            this.orderListData.push(orders)
            
            //  초기화
            this.orderCoffee = []
            this.cart = []
        },
        getOrderSequenceNo() {
            var index = 0
            if (this.orderListData.length > 0) {
                index = this.orderListData.length - 1
                return this.orderListData[index]['no'] + 1
            } else {
                return 1
            }
        }
    }
}
</script>

<style>

</style>