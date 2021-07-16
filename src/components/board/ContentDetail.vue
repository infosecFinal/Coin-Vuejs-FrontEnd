<template>
  <div>
      <br><br>
      <b-card class="mid" style="max-width: 1100px; background-color:#e9ecef; border-radius: 50px; border:none;">
          <br>
          <div class="row mid table">
          <div class="content-detail-content-info table" style="background-color:#fff; border-radius: 50px; border:none;">
              <div class="content-detail-content-info-left" >
                  <div class="content-detail-content-info-left-number" >
                      {{id}}
                  </div>
                  <div class="content-detail-content-info-left-subject">
                      {{data.title}}
                  </div>
              </div>
              <div class="content-detail-content-info-right" >
                  <div class="content-detail-content-info-right-user">
                      writer : {{data.user_id}}
                  </div>
                  <div class="content-detail-content-info-right-created">
                      Created_At : {{data.created_at}}
                  </div>
              </div>
              
          </div>
          <div class="content-detail-content-info mid2 table" style="background-color:#f1f5f8; border-radius: 50px; border:none;">
                  <ul>
                      <li v-for="(file, idx) in files" :key="idx" @click="download(file)">{{file.origin_file_Name}}</li>
                  </ul>
              </div>
          <div class="content-detail-content mid table" v-html="data.content" style="background-color:#fff; border-radius: 50px; border:none;">
              
          </div>

          <div class="content-detail-button" v-if="user.user_id === data.user_id">
              <b-button variant="primary" @click="modifyData">Modify</b-button>
              <b-button variant="success" @click="deleteData">Delete</b-button>
          </div>
          </div>
      </b-card>
  </div>
</template>

<script>
import {fetchDataById, deleteData, getUserInfo} from '@/service'
import { getFilesInfo, getFile } from '@/service/file/file.js';
import {mapGetters} from 'vuex';

export default {
    name: "ContentDetail",
    data() {
        return {
            id: Number(this.$route.params.contentId),
            data: {},
            files: [],
            user:''
        }
    },
    async created() {
        const data_resp = await fetchDataById(this.id);
        const file_resp = await getFilesInfo(this.id);
        const user_resp = await getUserInfo();
        this.data = data_resp.data.data;
        this.user = user_resp.data.data;
        this.files = file_resp.data.list;
        console.log(this.files);
        
    },
    computed: {
        ...mapGetters('account',[
            'getLoginId'
        ])
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
            link.click();
            link.remove();
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

.table {
   max-width: 800px; 
   left:0; 
   right:0; 
   margin-left:10%; 
   margin-right:10%; 
   top: 0; 
   bottom:0; 
   margin-top:0%; 
   margin-bottom:0%;
   }

.table2 {
   max-width: 700px; 
   left:0; 
   right:0; 
   margin-left:10%; 
   margin-right:10%; 
   top: 0; 
   bottom:0; 
   margin-top:0%; 
   margin-bottom:0%;
   }


.wrapmid{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.mid{
   min-width: 800px; left:0; right:0; margin-left:auto; margin-right:auto; top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
}

.mid2{
   max-width: 600px; left:0; right:0; margin-left:auto; margin-right:auto; top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
}

.input-field {
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  color: #252a32;
  background: #fff;
}
</style>