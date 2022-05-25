<template>
  <div class="border">
      <strong>대기중 고객</strong>
      <ul>
          <li v-for="(item, index) in customers" :key="index">
            {{ item }}
            <div>
                {{ getOrder(item.id) }}
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name : 'Customer',
    props: {
        orderList : {type : Array, default : new Array(0)},
    },
    data : function() {
        return {
            orderListData: [],
            customers: [],
        }
    }, 
    created: function() {
        this.orderListData = this.orderList
        // console.log('orderList', this.orderList)

    },
    methods: {
        getCustomerSeqId: function() {
            var index = 0
            if (this.customers.length > 0) {
                index = this.customers.length - 1
                return this.customers[index]['id'] + 1
            } else {
                return 1
            }
        },
        getOrder: function(customerId) {
            return this.orderListData.find((element) => element.customerId === customerId)
        }
    }
}
</script>

<style>

</style>