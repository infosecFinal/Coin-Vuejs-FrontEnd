<template>
  <b-row>
    <b-form-textarea
      id="textarea-no-resize"
      placeholder="채팅을 입력하세요."
      rows="3"
      v-model="message"
      no-resize
      @keyup.enter="sendMessage"
    ></b-form-textarea>
  </b-row>
</template>

<script>
<<<<<<< HEAD
=======
import {mapGetters} from 'vuex'

>>>>>>> f44338d59ce1164c3f387c4ea8cbc262e06a93c1
export default {
  name: "MessageForm",
  props: ["client"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      this.send();
      this.$emit("scrollDown");
      this.message = "";
    },
<<<<<<< HEAD
    send() {
      console.log(this.client.connected);
      console.log("Send Message: " + this.message);
      if (this.client && this.client.connected) {
        const msg = {
          name: "test",
          msg: this.message,
        };
        console.log(msg);
        this.client.send("/app/hello", JSON.stringify(msg), {});
      }
    },
  },
};
=======
    computed: {
      ...mapGetters('account', ['getLoginId'])
    },
    methods: {
        sendMessage() {
            this.send();
            this.$emit('scrollDown');
            this.message = '';
        },
        send() {
          console.log("Connected: ",this.client.connected);
          console.log("Send Message: " + this.message);
          if(this.client && this.client.connected) {
            const msg = {
              name: this.getLoginId,
              msg: this.message
            };
            console.log(msg);
            this.client.send("/app/hello",JSON.stringify(msg), {});
          }
        },
    }
}
>>>>>>> f44338d59ce1164c3f387c4ea8cbc262e06a93c1
</script>

<style>
#textarea-no-resize {
  position: fixed;
  z-index: 2;
  max-width: 800px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 100px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  max-height: 100px;
}
.list-group {
  min-width: 800px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
