<template>
  <div>
    <strong>바리스타</strong>
    <div>
      <input type="text" v-model="newBaristas.name" />
      <button @click="addBarista(newBaristas.name)">출근</button>
      <ul>
        <li v-for="(item, index) in baristas" :key="index">
          {{ item.name + ', ' + item.workingTime }}
          {{ checkBarista }}
          <progress max="100" value="0"></progress>
          <button @click="delBarista(index)">퇴근</button>
        </li>
      </ul>
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
    }
  },
  computed: {
    checkBarista: {
      get: function() {
        return this.baristas.map((element) => element.working)
      }
    }
  },
  watch: {
    orderListData() {
      console.log('주문 추가')
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
    }
  }
}
</script>
<style>
  li {
    list-style-type: none;
  }
</style>
