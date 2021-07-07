<template>
  <div style="background-color: black">
    <!-- <button @click="connect">채팅방 참여</button> -->
    <input  v-model="message" type="text" @keyup.enter="sendMessage">
    <div v-for="item in recvList" :key="item">
      <h3>content: {{item.content}}</h3>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export default {
  name: 'App',
  data() {
    return {
      recvList: [],
      message: ""
    }
  },
  created() {
    this.connect();
  },
  methods: {
    sendMessage() {
      this.send();
      this.message = ''
    },
    send() {
      console.log(this.stompClient.connected);
      console.log("Send Message: " + this.message);
      if(this.stompClient && this.stompClient.connected) {
        const msg = {
          name: this.message
        };
        console.log(msg);
        this.stompClient.send("/app/hello",JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:3333";
      var socket = new SockJS(serverURL+'/gs-guide-websocket');
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect({}, frame=>{
        this.connected = true;
        console.log('success connect socket', frame);
        this.stompClient.subscribe('/topic/greetings', res=>{
          console.log('message from subs', res.body);
          console.log(JSON.parse(res.body));
          this.recvList.push(JSON.parse(res.body));
          console.log(this.recvList);
        });
      },
      error => {
        console.log('소켓 연결 실패', error);
        this.connected = false;
      }
      );
    },
  },
}
</script>

<style scoped>
  h3 {
    color: white;
  }
</style>