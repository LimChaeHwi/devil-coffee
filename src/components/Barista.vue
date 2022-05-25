<template>
  <div>
    <strong>바리스타</strong>
    <div>
      <input type="text" v-model="newBaristas.name" />
      <button @click="addBarista(newBaristas.name)">출근</button>
      <ul>
        <li v-for="(item, index) in baristas" :key="index">
          {{ item.name + ', ' + $msToHMS(item.workingTime * 1000) }}
          {{ $msToHMS(item.completeTime) }}
          <progress max="100" :value="item.completeProgress"></progress>
          <button @click="delBarista(index)">퇴근</button>
        </li>
      </ul>
      {{ checkBarista }}
    </div>
  </div>
</template>

<script>
import Barista from '../domains/barista.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name : 'Barista',
  props: {
    orderList : {type: Array, default: new Array(0)}
  },
  data : function() {
    return {
      baristas: [],
      newBaristas: {
        id: 0,
        name: '',
      },
      orderListData: [],
      sIndex: 0,
      fIndex: 0,
    }
  },
  computed: {
    checkBarista: {
      get: function() {
        return this.baristas.map((element) => element.working)
      }
    },
    checkOrderListData: {
      get: function() {
        //  주문량을 변경감지 해야 computed, watch 가 발생한다
        return this.orderListData.length
      }
    }
  },
  watch: {
    checkOrderListData() {
      console.log('주문 추가', this.orderListData)
      this.makeCoffee()
    },
    checkBarista() {
      console.log('작업 변경', this.baristas)
      this.checkOrderFinish()
      this.makeCoffee()
    }
  },
  created: function() {
    var members = 3
    for (var n=0; n < members; n++) {
      this.addBarista('바리스타' + (n+1))
    }
    this.orderListData = this.orderList
  },
  methods: {
    addBarista: function(name) {
      if (this.baristas.length > 5) {
        alert('최대 인원은 6명 입니다.')
        return
      }
      var newIndex = this.baristas.push(new Barista(this.getSequenceId(), name))
      var barista = this.baristas[newIndex-1]
      barista.work()
    },
    delBarista: function(index) {
      if (this.baristas.length == 1) {
        alert('최소 1명은 남아있어야 합니다.')
        return
      }
      this.baristas.splice(index, 1)
    },
    getSequenceId: function() {
      if (this.baristas.length > 0) {
        return this.baristas[this.baristas.length-1].id + 1
      } else {
        return 1
      }
    },
    makeCoffee: function() {
      //  가용한 직원으로 주문리스트 처리
      console.log('makeCoffee')
      let order
      for (let i = this.sIndex; i < this.orderListData.length; i++) {
        order = this.orderListData[i]
        if (order.status === 'W' || order.status === 'S') {
          order.startOrders()
          break;
        }
      }
      if (order) {
        for (let j = 0; j < order.coffees.length; j++) {    
          if (order.coffees[j].status !== 'N') continue
          for (let k = 0; k < this.baristas.length; k++) {
            if (this.baristas[k].working === 'N') {
              this.baristas[k].make(order.coffees[j])
              order.coffees[j].making()
              return
            }
          }
        }
      }
    },
    checkOrderFinish: function() {
      
      let isStart
      let isFinish
      let startData = this.orderListData[this.sIndex]
      let finishData = this.orderListData[this.fIndex]
      if (startData) {
        isStart = startData.coffees.find(obj => obj.status === 'N')
        //  대기중인 커피 주문이 없으면 다음 index로 이동
        if (!isStart) {
          this.sIndex++
        }
      }
      if (finishData) {
        isFinish = finishData.coffees.find(obj => obj.status === 'N' || obj.status === 'I')
        if (!isFinish) {
          finishData.finishOrders()
          this.fIndex++
        }
      }
    }
  }
}
</script>
<style>
  li {
    list-style-type: none;
  }
</style>
