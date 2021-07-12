<template>
  <div>
      <b-input v-model="user_id" placeholder="write writer" :readonly="content_id? true:false"></b-input>
      <b-input v-model="title" placeholder="write title"></b-input>
      <b-form-textarea
      id="textarea"
      v-model="content"
      placeholder="write Content"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button @click="content_id ? update() : insert()">Save</b-button>
    <b-button @click="cancle">Cancle</b-button>
  </div>
</template>

<script>
import {insertData, updateData, fetchDataById} from '@/service'

export default {
    name: 'Create',
    data() {
        return {
            content_id: Number(this.$route.params.contentId),
            user_id: '',
            title: '',
            content: '',
            data: {}
        }
    },
    async created() {
        if(this.content_id !== undefined) {
            const resp = await fetchDataById(this.content_id);
            console.log(resp);
            this.user_id = resp.data.data.user_id;
            this.title = resp.data.data.title;
            this.content = resp.data.data.content
        }
    },
    methods: {
        cancle() {
            this.$router.push({
                path: '/board/free'
            })
        },
        async insert() {
            await insertData({
                user_id: this.user_id,
                title: this.title,
                content: this.content
            });
            this.$router.push({
                path: '/board/free'
            })
        },
        async update() {
            await updateData({
                id: this.content_id,
                title: this.title,
                content: this.content
            });
            this.$router.push({
                path: '/board/free'
            })
        }
    }
}
</script>

<style>

</style>