<template>

<div>

<div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <span class="text-black">Board</span>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Free</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <br>
          <h2 class="h3 mb-5 text-black">Chatroom</h2>
        </div>
      </div>
    </div>
  


  <div id="app">
  <b-container class="bv-example-row col" fluid style="width:1000px; background-color:#f1f5f8;  border-radius: 50px;" >
      <MessageList  :msgs="msgs"/>
      <MessageForm :client="stompClient" v-on:scrollDown="scrollDown"/>
      <br><br>
  </b-container>
  </div>

</div>
</template>

<script>
import MessageForm from '@/components/chat/MessageForm.vue'
import MessageList from '@/components/chat/MessageList.vue'
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import {mapState, mapGetters} from 'vuex'
import {getUserInfo} from '@/service'

export default {
    name: 'ChatRoom',
    data() {
      return {
        socket: null,
        user_id: '',
        stompClient: null
      }
    },
    components: {
        MessageForm,
        MessageList
    },
    computed: {
        ...mapState({
            msgs: $state => $state.stomp.msgs
        }),
        ...mapGetters('account', ['getLoginState'])
    },
    async created() {
        if(!this.getLoginState) {
          alert('로그인 후 이용해주세요');
          this.$router.go(-1);
        }
        const user = await getUserInfo();
        console.log("user:",user);
        this.user_id = user.data.data.user_id;
        this.connect();
    },
    methods: {
      connect() {
        const serverURL = "http://localhost:8084";
        this.socket = new SockJS(serverURL+'/gs-guide-websocket');
        
        this.stompClient = Stomp.over(this.socket);
        // console.log(`���� ������ �õ��մϴ�. ���� �ּ�: ${serverURL}`)
        this.stompClient.connect({}, frame=>{
          this.connected = true;
          console.log('success connect socket', frame);
          this.stompClient.subscribe('/topic/greetings', res=>{
            console.log('message from subs', res.body);
            // console.log(JSON.parse(res.body));
            // this.recvList.push(JSON.parse(res.body));
            this.$store.commit('stomp/pushMsg', JSON.parse(res.body));
            // console.log(this.recvList);
          });
        },
        error => {
          console.log('���� ���� ����', error);
          this.connected = false;
        }
        );
      },
      scrollDown() {
          var container = document.getElementById("container");
          container.scrollTop = container.scrollHeight+50;
      }
    },
    destroyed() {
      this.socket.close();
    }
}
</script>

<style>

</style>