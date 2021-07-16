<template>
  <b-row>
    <b-form-textarea
      class="col-sm-5"
      id="textarea-no-resize"
      placeholder="채팅을 입력하세요."
      rows="3"
      v-model="message"
      no-resize
      @keyup.enter="sendMessage"
      style="width:700px; background-color:#f1f5f8; "
    ></b-form-textarea>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageForm",
  props: ["client"],
  data() {
    return {
      message: "",
    };
  },
  computed: {
      ...mapGetters("account", ["getLoginId"]),
    },
  methods: {
    sendMessage() {
        this.send();
        this.$emit("scrollDown");
        this.message = "";
      },
    send() {
      console.log("Connected: ", this.client.connected);
      console.log("Send Message: " + this.message);
      if (this.client && this.client.connected) {
        const msg = {
          name: this.getLoginId,
          msg: this.message,
          };
          console.log(msg);
          this.client.send("/app/hello", JSON.stringify(msg), {});
        }
      },
    },
  };
</script>

<style>
#textarea-no-resize {
  position: relative;
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
