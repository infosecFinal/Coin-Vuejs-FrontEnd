<template>
  <div id="app">
  <b-container class="bv-example-row" fluid>
      <MessageList  :msgs="msgs"/>
      <MessageForm :user="user_id" :client="stompClient" v-on:scrollDown="scrollDown"/>
  </b-container>
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
        user_id: ''
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
        const serverURL = "http://localhost:8083";
        this.socket = new SockJS(serverURL+'/gs-guide-websocket');
        
        this.stompClient = Stomp.over(this.socket);
        // console.log(`���� ������ �õ��մϴ�. ���� �ּ�: ${serverURL}`)
        this.stompClient.connect({}, frame=>{
          this.connected = true;
          console.log('success connect socket', frame);
          this.stompClient.subscribe('/topic/greetings', res=>{
            // console.log('message from subs', res.body);
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