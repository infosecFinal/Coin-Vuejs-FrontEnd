<template>
  <div>
      <b-table striped hover :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" @row-clicked="rowClick"></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
      <b-button @click="writeContent" class="float-right">Write</b-button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {fetchData} from '@/service'

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
            ],
            currentPage: 1,
            perPage: 10,
            items: []
        }
    },
    async created() {
        const resp = await fetchData();
        console.log(resp);
        this.items = resp.data.list;
    },
    computed: {
        rows() {
            return this.items.length;
        }
    },
    methods: {
        ...mapActions('board',[
            'fetchData'
        ]),
        rowClick(item) {
            console.log("params: ", item.id)
            this.$router.push({
                path: `/board/free/detail/${item.id}`
            })
        },
        writeContent() {
            this.$router.push({
                path: '/board/free/create'
            })
        }
    }
}
</script>

<style>

</style>