<template>
  <div>
      <tr>
          <td>글번호</td>
          <td>글쓴이</td>
          <td>제목</td>
          <td>내용</td>
      </tr>
      <tr v-for="(value, idx) in items" :key="(idx)" @click="detail(value.id)">
          <td v-html="value.id"></td>
          <td v-html="value.user_id"></td>
          <td v-html="value.title"></td>
          <td v-html="value.content"></td>
      </tr>
      <button @click="write">글쓰기</button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'Read',
    data() {
        return {
            id:0,
            user_id: '',
            title: '',
            content: ''
        }
    },
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
        ]),
        write() {
            this.$router.push({
                path: '/board/create'
            });
        },
        detail(index) {
            this.$router.push({
                name: 'Detail',
                params: {
                    contentId: index
                }
            })
        }
    }
}
</script>

<style>

</style>