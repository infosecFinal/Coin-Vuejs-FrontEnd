<template>
  <b-row>
    <b-form-textarea
      class="col-sm- mid"
      placeholder="채팅을 입력하세요."
      rows="3"
      v-model="message"
      no-resize
      @keyup.enter="sendMessage"
      style="width:800px; height:50px;  border-radius: 50px;"
    ></b-form-textarea>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageForm",
  props: ["client", "user"],
  data() {
    return {
      message: "",
    };
  },
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
              name: this.user,
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
#textarea-no-resize {
  position: relative;
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
.table {
   max-width: 900px; 
   left:0; 
   right:0; 
   margin-left:10%; 
   margin-right:10%; 
   top: 0; 
   bottom:0; 
   margin-top:0%; 
   margin-bottom:0%;
   }
.wrapmid{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.mid{
   min-width: 800px; left:0; right:0; margin-left:auto; margin-right:auto; top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
}
</style>
