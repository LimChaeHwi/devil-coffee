<template>
  <div class="page-border">
    <strong>바리스타</strong>
    <div class="barista-enter">
      <input type="text" v-model="newBaristas.name" />
      <button class="barista-button" @click="addBarista(newBaristas.name)">출근</button>
    </div>
    <hr>
    <div>
      <ul>
        <li v-for="(item, index) in baristas" :key="index">
          <div class="barista">
            <span>
              <span>
                <i class="fa-solid fa-user"></i>
                {{ item.name + ' '}}
              </span>
              <span>
                <i class="fas fa-clock"></i>
                {{ $msToHMS(item.workingTime * 1000) }}
              </span>
              <button class="barista-button" @click="delBarista(index)">퇴근</button>
            </span>
            <div>
              <span>{{ item.coffee }}</span>
              <span :class="'working-' + item.working">
                {{ item.working == 'Y' ? '제조중' : '대기중' }}
              </span>
            </div>
            <div>
              {{ '남은시간 ' + $msToHMS(item.completeTime) }}
              <progress max="100" :value="item.completeProgress"></progress>
              <hr>
            </div>
          </div>
        </li>
      </ul>
      <span v-show="false">{{ checkBarista }}</span>
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
      // console.log('주문 추가', this.orderListData)
      this.makeCoffee()
    },
    checkBarista() {
      // console.log('작업 변경', this.baristas)
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
      if (this.baristas[index].isWorking()) {
        alert('작업중에는 퇴근할 수 없습니다.')
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
      // console.log('makeCoffee')
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
  .barista-button {
    background-color : white;
    border: 1px solid;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 4px;
    padding-right: 4px;
    margin: 4px;
    font-size: 16px;
    font-weight: bold;
  }
  .barista-enter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .barista {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .working-Y {
    background-color: red;
    padding: 4px;
    color: white;
  }
  .working-N {
    background-color: green;
    padding: 2px;
    color: white;
  }
</style>
