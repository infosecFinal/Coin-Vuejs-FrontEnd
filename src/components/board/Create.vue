<template>
  <div>
      <b-input :value="content_id ? user_id : getLoginId" readonly></b-input>
      <b-input v-model="title" placeholder="write title"></b-input>
      <b-form-textarea
      id="textarea"
      v-model="content"
      placeholder="write Content"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <div v-if="files">
            <span v-for="(file, idx) in files" :key=idx>{{file.origin_file_Name}}<button @click="deleteFileFromList(idx)">X</button>
                <br>
            </span>
    </div>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      multiple
    ></b-form-file>
    <b-button @click="content_id ? update() : insert()">Save</b-button>
    <b-button @click="cancle">Cancle</b-button>
  </div>
</template>

<script>
import {insertData, updateData, fetchDataById} from '@/service'
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
            data: {},
            files: [],
            formData: new FormData()
        }
    },
    async created() {
        if(!isNaN(this.content_id)) {
            const resp = await fetchDataById(this.content_id);
            const files = await getFilesInfo(this.content_id);
            this.user_id = resp.data.data.user_id;
            this.title = resp.data.data.title;
            this.content = resp.data.data.content;
            this.files = files.data.list;
        }
    },
    computed: {
        ...mapGetters('account', [
            'getLoginId'
        ])
    },
    methods: {
        cancle() {
            this.$router.push({
                path: '/board/free'
            })
        },
        async deleteFileFromList(idx) {
            let file = this.files[idx]
            this.files.splice(idx, 1);
            const resp = await deleteFile(file);
            console.log(resp);
        },
        async insert() {
            const resp = await insertData({
                user_id: this.getLoginId,
                title: this.title,
                content: this.content
            });
            console.log(resp);
            if(this.file1 !== null) this.fileUpload();
            this.$router.push({
                path: '/board/free'
            })
        },
        async update() {
            console.log(this.user_id);
            console.log(this.title);
            const resp = await updateData({
                id: this.content_id,
                user_id: this.user_id,
                title: this.title,
                content: this.content
            });
            console.log(resp);
            if(this.file1 !== null) this.fileUpload();
            this.$router.push({
                path: '/board/free'
            })
        },
        async fileUpload() {
            console.log(this.file1);
            let formData = new FormData();
            for (let i = 0; i < this.file1.length; i++) {
                formData.append('files', this.file1[i]);
                console.log(i,": ", this.file1[i])
            }
            const resp = await insertFile(formData,this.content_id?this.content_id:'new');
            console.log(resp);
        }
    }
}
</script>

<style>

</style>