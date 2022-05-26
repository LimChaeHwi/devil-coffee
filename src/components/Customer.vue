<template>
  <div class="page-border">
      <strong>대기중 고객</strong>
      <hr>
      <ul class="align-center">
          <li v-for="(item, index) in customers" :key="index">
            {{ getOrder(item.id).coffes }}
            <div :class="'order-item-' + getOrder(item.id).status" @click="deleteOrder(item, index)">
                <div>
                    <span>{{ getOrder(item.id).no }}번 </span>
                    <span v-show="item.name == '' ? false : true">{{ item.name }}님</span>
                </div>
                <div v-for="(coffee, subIndex) in getOrder(item.id).coffees" :key="subIndex">
                    <span>{{ coffee.name }} </span>
                    <span v-show="coffee.status == 'Y' ? true : false">
                    <i class="fa-solid fa-mug-hot"></i>
                    </span>
                </div>
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
            customerId: 0,
        }
    }, 
    created: function() {
        this.orderListData = this.orderList
        // console.log('orderList', this.orderList)

    },
    methods: {
        getCustomerSeqId: function() {
            return ++this.customerId
        },
        getOrder: function(customerId) {
            return this.orderListData.find((element) => element.customerId === customerId)
        },
        deleteOrder: function(item, index) {
            if (this.getOrder(item.id).status !== 'F') {
                return
            }
            this.customers.splice(index, 1)
        }
    }
}
</script>

<style>
    .order-item-W {
        border: 1px solid #bbb;
        cursor: pointer;
        margin-bottom: 4px;
    }
    .order-item-S {
        border: 1px solid #bbb;
        background-color: yellow;
        cursor: pointer;
        margin-bottom: 4px;
    }
    .order-item-F {
        border: 1px solid #bbb;
        background-color: yellowgreen;
        cursor: grab;
        margin-bottom: 4px;
    }
    .align-center {
        padding-inline-start: 20px;
        padding-inline-end: 20px
    }
</style>