<template>
  <div>
    <strong>영업중</strong> {{ $msToHMS(time * 1000) }}
  </div>
  <Barista :order-list="orderList"/>
  <Kiosk :order-list="orderList"/>
  <Customer ref="customer" :order-list="orderList"/>
</template>

<script>
import Barista from './components/Barista.vue'
import Kiosk from './components/Kiosk.vue'
import Customer from './components/Customer.vue'

export default {
  name: 'App',
  components: {
    Barista, Kiosk, Customer
  },
  data: function() {
    return {
      time : 0,
      orderList: [],
    };
  },
  created: function() {
    setInterval(() => {
      this.time++
    }, 1000);
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-border {
  border: 1px solid black;
  min-width: 20%;
  margin: 10px;
  padding: 10px;
  border-radius: 6px;
}
.tag-border {
  border: 1px solid black;
  padding: 4px;
  margin: 4px;
}

</style>
