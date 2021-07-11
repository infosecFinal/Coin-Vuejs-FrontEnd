<template>
<div>
  <div>
      {{data.content}}
  </div>
  <div>
      <button @click="updatePost">update</button>
      <button @click="deletePost">delete</button>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Detail',
    data() {
        return {
            index: this.$route.params.contentId,
            data: {}
        }
    },
    created() {
        this.data = this.$store.state.board.writelist[this.index];
        console.log(this.data);
    },
    methods: {
        async deletePost() {
            const response = await axios.post(`${this.$baseURL}/board/delete`, {id: this.data.id});
            console.log(response);
            this.$router.push('/board');
        },
        updatePost() {
            this.$router.push({
                name: 'Modify',
                params: {
                    contentId: this.index
                }
            })
        }
    }

}
</script>

<style>

</style>