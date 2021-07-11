<template>
  <div>
      <p>{{user_id}}</p>
      <input v-model="title" placeholder="����"/>
      <textarea v-model="content" placeholder="����"/>
      <button @click="modify"><router-link to='board'>Modify</router-link></button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Modify',
    data() {
        return {
            index: this.$route.params.contentId,
            title: "",
            content: ""
        }
    },
    created() {
        this.title = this.$store.state.board.writelist[this.index].title
        this.content = this.$store.state.board.writelist[this.index].content
    },
    computed: {
        user_id () {
            return this.$store.state.board.writelist[this.index].user_id
        },
        id() {
            return this.$store.state.board.writelist[this.index].id
        }
    },
    methods: {
        async  modify() {
            const post_data = {
                id: this.id,
                title: this.title,
                content: this.content
            }
            console.log(post_data)
            const response = await axios.post(`${this.$baseURL}/board/update`, post_data);
            console.log(response);
            this.$router.push('/board');
        }
    }
    
}
</script>

<style>

</style>