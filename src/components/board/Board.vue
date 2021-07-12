<template>
  <div>
      <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    name: 'Board',
    data() {
        return {
            fields: [
                {
                    key: 'id',
                    label: '글 번호'
                },
                {
                    key: 'user_id',
                    label: '글쓴이'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'created_at',
                    label: '작성일'
                }
            ]
        }
    },
    created() {
        this.fetchData();
        console.log(this.items)
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
    }
}
</script>

<style>

</style>