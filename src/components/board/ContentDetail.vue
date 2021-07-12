<template>
  <div>
      <b-card>
          <div class="content-detail-content-info">
              <div class="content-detail-content-info-left">
                  <div class="content-detail-content-info-left-number">
                      {{id}}
                  </div>
                  <div class="content-detail-content-info-left-subject">
                      {{data.title}}
                  </div>
              </div>
              <div class="content-detail-content-info-right">
                  <div class="content-detail-content-info-right-user">
                      writer: {{data.user_id}}
                  </div>
                  <div class="content-detail-content-info-right-created">
                      posted_at: {{data.created_at}}
                  </div>
              </div>
          </div>
          <div class="content-detail-content" v-html="data.content">
              
          </div>
          <div class="content-detail-button">
              <b-button variant="primary" @click="modifyData">Modify</b-button>
              <b-button variant="success" @click="deleteData">Delete</b-button>
          </div>
      </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import axios from 'axios';

export default {
    name: "ContentDetail",
    data() {
        return {
            id: Number(this.$route.params.contentId),
        }
    },
    created() {
        this.fetchDataById(this.id);
    },
    computed: {
        data() {
            return this.$store.state.board.post;
        }
    },
    methods: {
        ...mapActions('board', [
            'fetchDataById'
        ]),
        async deleteData() {
            await axios.post(`${this.$baseURL}/board/delete`, {id: this.id})
            .then((response) => {
                if(response.data === 1) {
                    this.$store.state.board.writelist = this.$store.state.board.writelist.filter(item => item.id !== this.id)
                }
                console.log(this.$store.state.board.writelist)
            })
            this.$router.push({
                path: '/board/free'
            });
        },
        modifyData() {
            this.$router.push({
                path:  `/board/free/create/${this.id}`,
            })
        }
    }
}
</script>

<style>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}
.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}
.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>