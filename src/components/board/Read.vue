<template>
  <div>
      <tr v-for="(value, idx) in items" :key="(idx)">
          <td>{{value}}</td>
          <!-- <td>{{value.title}}</td>
          <td>{{value.content}}</td> -->
      </tr>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'Read',
    created() {
        this.fetchData()
    },
    computed: {
        ...mapState({
            items: $state => $state.board.writelist
        })
    },
    methods: {
        ...mapActions('board',[
            'fetchData'
        ])
    }
}
</script>

<style>

</style>