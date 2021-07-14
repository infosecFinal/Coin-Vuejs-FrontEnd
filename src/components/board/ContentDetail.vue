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
                      writer : {{data.user_id}}
                  </div>
                  <div class="content-detail-content-info-right-created">
                      Created_At : {{data.created_at}}
                  </div>
              </div>
              
          </div>
          <div class="content-detail-content-info" style="margin-top: 1rem">
                  <ul>
                      <li v-for="(file, idx) in files" :key="idx" @click="download(file)">{{file.origin_file_Name}}</li>
                  </ul>
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
import { getFilesInfo, getFile } from '@/service/file/file.js';

export default {
    name: "ContentDetail",
    data() {
        return {
            id: Number(this.$route.params.contentId),
            data: {},
            files: []
        }
    },
    async created() {
        const data_resp = await fetchDataById(this.id);
        const file_resp = await getFilesInfo(this.id);
        this.data = data_resp.data.data;
        this.files = file_resp.data.list;
        console.log(this.files);
        
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
        },
        async download(file) {
            await getFile(file.id);
            const url = `http://localhost:8083/file/download/${file.id}`
            const link = document.createElement('a');
            // const contentDisposition = resp.headers['content-disposition'];
            
            // let fileName = 'undefined';
            // if(contentDisposition) {
            //     const [ fileNameMatch ] = contentDisposition.split(';').filter(str=>str.includes('fileName'));
            //     if(fileNameMatch) [, fileName] = fileNameMatch.split('=');
            // }
            // fileName = decodeURI(fileName);
            link.href = url;
            document.body.appendChild(link);
            console.log(link);
            link.click();
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