<template>
  <div>
      <p>{{user_id}}</p>
      <input v-model="title" placeholder="제목"/>
      <textarea v-model="content" placeholder="내용"/>
      <button @click="modify"><router-link to='board'>Modify</router-link></button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Modify',
    data() {
        return {
            index: this.$route.params.contentId
        }
    },
    created() {
        console.log(this.index);
    },
    computed: {
        user_id () {
            return this.$store.state.board.writelist[this.index].user_id
        },
        id() {
            return this.$store.state.board.writelist[this.index].id
        },
        title() {
            return this.$store.state.board.writelist[this.index].title
        },
        content() {
            return this.$store.state.board.writelist[this.index].content
        }
    },
    methods: {
        modify() {
            const response = axios.post(`${this.$baseURL}/board/update`, {
                id: this.id,
                title: this.title,
                content: this.content
            });
            console.log(response);
            this.$router.push('/board');
        }
    }
    
}
</script>

<style>

</style>