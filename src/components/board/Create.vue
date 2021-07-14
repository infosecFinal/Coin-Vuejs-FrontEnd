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
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <b-button @click="content_id ? update() : insert()">Save</b-button>
    <b-button @click="cancle">Cancle</b-button>
  </div>
</template>

<script>
import {insertData, updateData, fetchDataById} from '@/service'
import {insertFile} from '@/service/file/file.js'
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
            formData: new FormData()
        }
    },
    async created() {
        console.log("Nan: ", isNaN(this.content_id));
        if(!isNaN(this.content_id)) {
            const resp = await fetchDataById(this.content_id);
            console.log(resp);
            this.user_id = resp.data.data.user_id;
            this.title = resp.data.data.title;
            this.content = resp.data.data.content
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
            let formData = new FormData();
            formData.append('files', this.file1);
            const resp = await insertFile(formData,this.content_id?this.content_id:'new');
            console.log(resp);
        }
    }
}
</script>

<style>

</style>