<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Detail',
    data() {
        return {
            index: this.$route.params.contentId
        }
    },
    created() {
        this.getContent();
    },
    methods: {
        getContent() {
            axios.get(`${this.baseURL}/board/${this.index}`)
                .then((result) => {
                    console.log(result)
                })
        }
    }

}
</script>

<style>

</style>