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
import axios from 'axios';

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
    created() {
        if(this.content_id !== undefined) {
            this.data = this.$store.state.board.writelist.filter(items => items.id === this.content_id)[0];
            this.user_id = this.data.user_id;
            this.title = this.data.title;
            this.content = this.data.content;
            console.log(this.content);
        }
    },
    methods: {
        cancle() {
            this.$router.push({
                path: '/board/free'
            })
        },
        insert() {
            axios.post(`${this.$baseURL}/board/insert`, {
                user_id: this.user_id,
                title: this.title,
                content: this.content
            }).then((response) => {
                console.log(response);
                this.$router.push({
                    path: '/board/free'
                })
            })
        },
        update() {
            console.log('update')
            console.log(this.content_id);
            axios.post(`${this.$baseURL}/board/update`, {
                id: this.content_id,
                title: this.title,
                content: this.content
            }).then((response) => {
                console.log(response);
                this.$router.push({
                    path: '/board/free'
                })
            })
        }
    }
}
</script>

<style>

</style>