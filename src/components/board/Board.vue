<template>
  <div>
      <b-container fluid class="text-light text-center">
          <b-row>
              <b-col>
              </b-col>
              <b-col col lg="3">
                  <b-input-group>
                      <b-form-select
                      v-model="category"
                    :options="['title','content','user_id']"
                    :value="null">
                  </b-form-select>
                      <b-form-input v-model="to_find" @keyup.enter="find"></b-form-input>
                          <b-input-group-append>
                              <b-button text="Button" variant="success" @click="find">Find</b-button>
                          </b-input-group-append>
                  </b-input-group>
              </b-col>
          </b-row>
      <b-row>
          <b-col>
      <b-table striped hover :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" @row-clicked="rowClick"></b-table>
      </b-col>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
      <b-row align-h="end">
          <b-col cols="4">
      <b-button @click="writeContent" offset-md="4">Write</b-button>
      </b-col>
      </b-row>
      </b-container>
      
  </div>
</template>

<script>
import {fetchData, findData} from '@/service'

export default {
    name: 'Board',
    data() {
        return {
            to_find: '',
            category: 'title',
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
        },
        async find() {
            const resp = await findData(this.category, this.to_find);
            console.log(resp);
            this.items = resp.data.list;
        }
    }
}
</script>

<style>

</style>