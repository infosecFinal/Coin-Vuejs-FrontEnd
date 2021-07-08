<template>
  <textarea v-model="message" type="text" @keyup.enter="sendMessage" />
</template>

<script>

export default {
    name: 'MessageForm',
    props: ['client'],
    data() {
        return {
            message:''
        }
    },
    methods: {
        sendMessage() {
            this.send();
            this.message = '';
        },
        send() {
          console.log(this.client.connected);
          console.log("Send Message: " + this.message);
          if(this.client && this.client.connected) {
            const msg = {
              name: "test",
              msg: this.message
            };
            console.log(msg);
            this.client.send("/app/hello",JSON.stringify(msg), {});
          }
        },
    }
}
</script>

<style>

</style>