<template>
<div>
  <div>
      {{data.content}}
  </div>
  <div>
      <button>modify</button>
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
        this.getContent();
    },
    methods: {
        getContent() {
            console.log(`URL: ${this.$baseURL}/board/${this.index}`)
            axios.get(`${this.$baseURL}/board/${this.index}`)
                .then((result) => {
                    console.log(result)
                    this.data = result.data.data
                    console.log(this.data);
                })
        },
        async deletePost() {
            const response = await axios.post(`${this.$baseURL}/board/delete`, {id: this.index});
            console.log(response);
            this.$router.push('/board');
        }
    }

}
</script>

<style>

</style>