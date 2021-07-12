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
import {fetchDataById, deleteData} from '@/service'

export default {
    name: "ContentDetail",
    data() {
        return {
            id: Number(this.$route.params.contentId),
            data: {}
        }
    },
    async created() {
        const resp = await fetchDataById(this.id);
        this.data = resp.data.data;
        
    },
    methods: {
        async deleteData() {
            await deleteData(this.id);
            this.$router.push('/board/free')
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