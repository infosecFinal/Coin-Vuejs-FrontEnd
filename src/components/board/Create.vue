<template>
  <div>
      <input v-model="user_id" placeholder="글쓴이"/>
      <input v-model="title" placeholder="제목"/>
      <textarea v-model="content" placeholder="내용"/>
      <button @click="write"><router-link to='board'>작성</router-link></button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';
export default {
    name: 'Create',
    data() {
        return {
            user_id:'',
            title:'',
            content:''
        }
    },
    methods: {
        ...mapMutations('board', [
            'writeData'
        ]),
        async write() {
            const response = await axios.post(`${this.$baseURL}/board/insert`,{
                user_id : this.user_id,
                title : this.title,
                content : this.content
            });
            console.log(response);
            this.$router.push('/board')
        }
    }
}
</script>

<style>

</style>