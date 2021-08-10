<template>
  <div class="mid" style="display:block; margin: 0 auto;">
      <br><br>
    <div class="col-sm-7 table" style="background-color:#f1f5f8; border-radius: 50px;">
      <br><br>
      <b-input :value="user_id" readonly  style="width:700px; display:block; margin: 0 auto; border-radius: 50px;"></b-input>
      <br>
      <b-form-input id="titlearea" v-model="title" placeholder="write title" style="width:700px; display:block; margin: 0 auto; "></b-form-input>
      <br><br>
      <b-form-textarea

      id="textarea"
      v-model="content"
      placeholder="write Content"
      rows="3"
      max-rows="6"
      style="height:300px; width:700px; display:block; margin: 0 auto;"
    ></b-form-textarea>
    <div v-if="files">
            <span v-for="(file, idx) in files" :key=idx>{{file.origin_file_Name}}<button @click="deleteFileFromList(idx)">X</button>
                <br>
            </span>
    </div>
      <b-form-file
      style="margin:50px"
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      multiple
    ></b-form-file>

    <div class="col" align="right" style="margin-right:70px;">
    <b-button pill variant="warning" @click="content_id ? update() : insert()">등록</b-button>

     &nbsp;
    <b-button pill variant="warning" @click="cancel">취소</b-button>
    </div>
    <br><br>
  </div>
  </div>
</template>

<script>
import {insertData, updateData, fetchDataById, getUserInfo} from '@/service'
import {insertFile, getFilesInfo, deleteFile} from '@/service/file/file.js'
import {mapGetters} from 'vuex'

export default {
    name: 'Create',
    data() {
        return {
            content_id: Number(this.$route.params.contentId),
            title: '',
            content: '',
            file1: null,
            user_id : '',
            board_id: '',
            data: {},
            files: [],
            pageType: this.$route.params.pageType,
            formData: new FormData()
        }
    },
    async created() {
        console.log("content_id: ", this.content_id, " pageType: ", this.pageType);
        if(!isNaN(this.content_id)) {
            const resp = await fetchDataById(this.content_id);
            const files = await getFilesInfo(this.content_id);
            this.user_id = resp.data.data.user_id;
            this.title = resp.data.data.title;
            this.content = resp.data.data.content;
            this.files = files.data.list;
        } else {
            const resp = await getUserInfo();
            if(resp.data.code > 0) this.user_id = resp.data.data.user_id;
        }
    },
    watch: {
    '$route.params.pageType': function(val) {
      this.pageType = val;
      this.fetch(false);
    }
  },    
    computed: {
        ...mapGetters('account', [
            'getLoginId'
        ])
    },
    methods: {
        cancel() {
            this.$router.push({
                path: '/board/free'
            })
        },
        async deleteFileFromList(idx) {
            let file = this.files[idx]
            this.files.splice(idx, 1);
            await deleteFile(file);
        },
        async insert() {
            const resp = await insertData({
                user_id: this.user_id,
                title: this.title,
                content: this.content,
                pageType: this.pageType
            });
            console.log('res:', resp);
            if(this.file1 !== null) this.fileUpload();
            this.$router.push({
                path: '/board/free'
            })
        },
        async update() {
            console.log("update start: ",this.user_id);
            const resp = await updateData({
                id: this.content_id,
                title: this.title,
                content: this.content
            });
            console.log("update response: ", resp);
            if(this.file1 !== null) this.fileUpload();
            this.$router.push({
                path: '/board/free'
            })
        },
        async fileUpload() {
            let formData = new FormData();
            for (let i = 0; i < this.file1.length; i++) {
                formData.append('files', this.file1[i]);
            }
            console.log(this.pageType);
            const resp = await insertFile(formData,this.content_id?this.content_id:'new',this.user_id?this.user_id:this.getLoginId, this.pageType)
            console.log("file resp" , resp);
        }
    }
}
</script>

<style>
.wrapmid{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.table {
   max-width: 800px;
   max-height: 1000px; 
   left:0; 
   right:0; 
   margin-left:20%; 
   margin-right:20%; 
   top: 0; 
   bottom:0; 
   margin-top:auto; 
   margin-bottom:auto;
   }
.wrapmid{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.custom-file, .custom-file-input {
    position: relative;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
}

</style>
